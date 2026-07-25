import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Portfolio } from './portfolio';

describe('Portfolio', () => {
  let component: Portfolio;
  let fixture: ComponentFixture<Portfolio>;

  beforeEach(async () => {
    TestBed.overrideComponent(Portfolio, {
      set: {
        imports: [],
        template: '<section data-testid="portfolio-root"></section>',
      },
    });

    await TestBed.configureTestingModule({
      imports: [Portfolio],
    }).compileComponents();

    fixture = TestBed.createComponent(Portfolio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the article layout container', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-testid="portfolio-root"]')).toBeTruthy();
  });
});
