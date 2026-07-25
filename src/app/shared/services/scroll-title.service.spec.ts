import { TestBed } from '@angular/core/testing';

import { ScrollTitleService } from './scroll-title.service';

describe('ScrollTitleService', () => {
  let service: ScrollTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update scroll title state', () => {
    service.setScrollTitle('Sample title', true);

    expect(service.currentScrollTitle()).toBe('Sample title');
    expect(service.isScrolled()).toBe(true);
  });

  it('should clear scroll title state', () => {
    service.setScrollTitle('Sample title', true);

    service.clearScrollTitle();

    expect(service.currentScrollTitle()).toBeNull();
    expect(service.isScrolled()).toBe(false);
  });
});
