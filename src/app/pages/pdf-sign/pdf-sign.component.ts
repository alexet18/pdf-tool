import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

import * as pdfjsLib from 'pdfjs-dist'
import { PaintableCanvasDirective } from '../../directives/paintable-canvas.directive';
import jsPDF from 'jspdf';
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdf.worker.min.mjs",
  import.meta.url
).toString()

@Component({
  selector: 'app-pdf-sign',
  imports: [NzIconModule, NzButtonModule, FormsModule, CommonModule,PaintableCanvasDirective],
  templateUrl: './pdf-sign.component.html',
  styleUrl: './pdf-sign.component.less'
})
export class PdfSignComponent implements AfterViewChecked{

  @ViewChild('nativeInput') nativeInput: ElementRef | undefined;
  openFileDialog() {
    this.nativeInput?.nativeElement.click();
  }

  canvas:any;

  ngAfterViewChecked(): void {
    this.canvas = document.getElementById('the-canvas');
  }

  showCanvas = false;

  eventHandler(event: any) {

    if(event.target.files.length === 0){
        this.showCanvas = false;
        return;
    }

    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (fileReader.result) {
        this.loadPDFtoCanvas(fileReader.result)
        this.showCanvas = true;
      }
      else {
        this.showCanvas = false;
      }
    }
    fileReader.readAsBinaryString(event.target.files[0]);
  }


  loadPDFtoCanvas(binaryPdf: any) {
    const loadingTask = pdfjsLib.getDocument({ data: binaryPdf });
    loadingTask.promise.then((pdf) => {

      var pageNumber = 1;
      pdf.getPage(pageNumber).then(function (page) {

        var scale = 1.5;
        var viewport = page.getViewport({ scale: scale });

        var canvas: any = document.getElementById('the-canvas');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        var renderTask = page.render(renderContext);
        renderTask.promise.then(function () {
          console.log('Page rendered');
        });
      });
    });
  }

  downloadPdf(){

  var imgData = this.canvas.toDataURL("image/jpeg", 1.0);
  var pdf = new jsPDF('p', 'pt', 'a4');
  pdf.addImage(imgData,'JPEG', 0, 0,595.28,841.89);
  pdf.save("signed.pdf");
}
}
