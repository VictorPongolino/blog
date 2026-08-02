import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router, provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { ArticleCatalog } from './article';

describe('ArticleCatalog', () => {
  let component: ArticleCatalog;
  let fixture: ComponentFixture<ArticleCatalog>;
  let router: Router;

  const queryParamMap$ = new BehaviorSubject(convertToParamMap({ page: '1' }));

  const articles = [
    {
      author: { name: 'Alice', avatar: 'alice.png' },
      title: 'Angular testing intro',
      slug: 'angular-testing-intro',
      description: 'How to write great tests',
      body: 'Test body',
      date: new Date('2026-01-10'),
      tags: [{ slug: 'angular', name: 'Angular' }],
    },
    {
      author: { name: 'Bob', avatar: 'bob.png' },
      title: 'Learning signals',
      slug: 'learning-signals',
      description: 'Signals in practice',
      body: 'Signals body',
      date: new Date('2025-01-10'),
      tags: [{ slug: 'frontend', name: 'Frontend' }],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleCatalog],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: queryParamMap$.asObservable(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleCatalog);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    fixture.componentRef.setInput('articles', articles);
    fixture.componentRef.setInput('showSearchControl', false);
    fixture.componentRef.setInput('searchQuery', '');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build category list including All', () => {
    expect(component.categories()).toContain('All');
    expect(component.categories()).toContain('Angular');
    expect(component.categories()).toContain('Frontend');
  });

  it('should navigate to selected post slug', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    const scrollSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);

    component.navigateToPost('angular-testing-intro');

    expect(navigateSpy).toHaveBeenCalledWith(['/blog', 'angular-testing-intro']);

    scrollSpy.mockRestore();
  });

  it('should update filter from category click', () => {
    component.onCategoryFilterClick({ name: 'Angular' });

    expect(component.filter().categoria).toBe('Angular');
  });

  it('should merge query params on page change', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    component.onPageChange(3);

    expect(navigateSpy).toHaveBeenCalledWith([], {
      relativeTo: TestBed.inject(ActivatedRoute),
      queryParams: { page: 3 },
      queryParamsHandling: 'merge',
    });
  });

  it('should filter articles by search query', () => {
    fixture.componentRef.setInput('searchQuery', 'signals');
    fixture.detectChanges();

    const filtered = component.filteredArticles();
    expect(filtered.length).toBe(1);
    expect(filtered[0].slug).toBe('learning-signals');
  });

  it('should paginate visible articles by current page', () => {
    component.maxItemsPerPage.set(1);
    queryParamMap$.next(convertToParamMap({ page: '2' }));
    fixture.detectChanges();

    const visible = component.visibleArticles();
    expect(visible.length).toBe(1);
    expect(visible[0].slug).toBe('learning-signals');
  });
});
