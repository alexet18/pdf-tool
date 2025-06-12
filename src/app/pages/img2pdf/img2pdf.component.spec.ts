import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Img2pdfComponent } from './img2pdf.component';

describe('Img2pdfComponent', () => {
  let component: Img2pdfComponent;
  let fixture: ComponentFixture<Img2pdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Img2pdfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Img2pdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
