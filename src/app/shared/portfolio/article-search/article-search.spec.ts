import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSearch } from './article-search';

describe('ArticleSearch', () => {
  let component: ArticleSearch;
  let fixture: ComponentFixture<ArticleSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dropdown open and close', () => {
    component.toggleDropdown('tempo');
    expect(component.openDropdown).toBe('tempo');

    component.toggleDropdown('tempo');
    expect(component.openDropdown).toBeNull();
  });

  it('should emit filter values when selecting an item', () => {
    const emitSpy = vi.spyOn(component.filterChange, 'emit');

    component.selectItem('tempo', 'Today');

    expect(component.selected['tempo']).toBe('Today');
    expect(component.openDropdown).toBeNull();
    expect(emitSpy).toHaveBeenCalledWith({
      order: component.selected['relevancia'],
      tempo: 'Today',
      categoria: component.selected['categoria'],
    });
  });

  it('should close dropdown on outside click', () => {
    component.openDropdown = 'categoria';
    const outsideElement = document.createElement('div');

    component.onClickOutside(outsideElement);

    expect(component.openDropdown).toBeNull();
  });
});
