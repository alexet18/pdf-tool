import { Routes } from '@angular/router';
import { Img2pdfComponent } from './pages/img2pdf/img2pdf.component';
import { Pdf2imgComponent } from './pages/pdf2img/pdf2img.component';

export const routes: Routes = [
    {path:'img2pdf',component:Img2pdfComponent},
    {path:'pdf2img',component:Pdf2imgComponent}
];
