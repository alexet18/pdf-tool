import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pdf2imgComponent } from './pdf2img.component';

describe('Pdf2imgComponent', () => {
  let component: Pdf2imgComponent;
  let fixture: ComponentFixture<Pdf2imgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pdf2imgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pdf2imgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
