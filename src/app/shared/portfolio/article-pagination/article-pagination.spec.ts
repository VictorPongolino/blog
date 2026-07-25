import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlePagination } from './article-pagination';

describe('ArticlePagination', () => {
  let component: ArticlePagination;
  let fixture: ComponentFixture<ArticlePagination>;
  const originalMatchMedia = window.matchMedia;

  beforeAll(() => {
    if (typeof window.matchMedia !== 'function') {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(() => ({
          matches: false,
          media: '',
          onchange: null,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          addListener: vi.fn(),
          removeListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });
    }
  });

  afterAll(() => {
    if (originalMatchMedia) {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: originalMatchMedia,
      });
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlePagination],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticlePagination);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('pages', [1, 2, 3, 4, 5, 6]);
    fixture.componentRef.setInput('currentPage', 2);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute visible pages and ellipsis state', () => {
    expect(component.visiblePages()).toEqual([1, 2, 3, 4, 5]);
    expect(component.showEllipsis()).toBe(true);
    expect(component.hasLastPage()).toBe(true);
  });

  it('should clamp page input to valid range', () => {
    const input = document.createElement('input');
    input.value = '99';

    component.onPageInput({ target: input } as unknown as Event);

    expect(component.selectedPage).toBe(6);
    expect(input.value).toBe('6');
  });

  it('should clear selected page on empty input', () => {
    const input = document.createElement('input');
    input.value = '';

    component.onPageInput({ target: input } as unknown as Event);

    expect(component.selectedPage).toBeNull();
  });

  it('should ignore invalid pasted values', () => {
    const preventDefault = vi.fn();
    const event = {
      clipboardData: {
        getData: () => 'abc',
      },
      preventDefault,
    } as unknown as ClipboardEvent;

    component.onPagePaste(event);

    expect(preventDefault).toHaveBeenCalled();
  });

  it('should emit pageClick with clamped value and reset selectedPage', () => {
    const emitSpy = vi.spyOn(component.pageClick, 'emit');
    const scrollSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);

    component.selectedPage = 4;
    component.onPageClick(99);

    expect(component.selectedPage).toBeNull();
    expect(scrollSpy).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalledWith(6);

    scrollSpy.mockRestore();
  });

  it('should submit valid selected page', () => {
    const clickSpy = vi.spyOn(component, 'onPageClick');
    component.selectedPage = 3;

    component.onPageSubmit();

    expect(clickSpy).toHaveBeenCalledWith(3);
  });
});
