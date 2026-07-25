import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import articlesData from '../../../../../public/articles/metadata/articles.json';

import { Post } from './post';

describe('Post', () => {
  let component: Post;
  let fixture: ComponentFixture<Post>;
  const existingSlug = articlesData[0]?.slug ?? '';
  const paramMap$ = new BehaviorSubject(convertToParamMap({ slug: existingSlug }));

  beforeEach(async () => {
    TestBed.overrideComponent(Post, {
      set: {
        imports: [],
        template: '<section data-testid="post-root"></section>',
      },
    });

    await TestBed.configureTestingModule({
      imports: [Post],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: paramMap$.asObservable(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Post);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render shallow post root', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-testid="post-root"]')).toBeTruthy();
  });

  it('should resolve a post from the current slug', () => {
    const post = component.post();
    expect(post).toBeTruthy();
    expect(post?.slug).toBe(existingSlug);
  });

  it('should exclude current post from recommended list', () => {
    const recommended = component.recommended();
    expect(recommended.length).toBeGreaterThan(0);
    expect(recommended.some((item) => item.slug === 'teste')).toBe(false);
  });

  it('should react when slug changes', () => {
    paramMap$.next(convertToParamMap({ slug: 'missing-slug' }));
    fixture.detectChanges();
    expect(component.post()).toBeUndefined();

    paramMap$.next(convertToParamMap({ slug: existingSlug }));
    fixture.detectChanges();

    expect(component.post()?.slug).toBe(existingSlug);
  });
});
