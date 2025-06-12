import { Component, ElementRef, ViewChild } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';

import * as pdfjsLib from 'pdfjs-dist'
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString()


@Component({
  selector: 'app-pdf2img',
  imports: [NzIconModule, NzButtonModule, FormsModule],
  templateUrl: './pdf2img.component.html',
  styleUrl: './pdf2img.component.less'
})
export class Pdf2imgComponent {

  @ViewChild('nativeInput') nativeInput: ElementRef | undefined;
  openFileDialog() {
    this.nativeInput?.nativeElement.click();
  }

  pdfUrl: string | undefined;

  eventHandler(event: any) {
    console.log(event.target.files[0])

    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (fileReader.result) {
        console.log(fileReader.result);
        this.loadPDF(fileReader.result)
      }
    }
    fileReader.readAsBinaryString(event.target.files[0]);
  }



  loadPDF(binaryPdf: any) {
    const loadingTask = pdfjsLib.getDocument({ data: binaryPdf });
    loadingTask.promise.then((pdf) => {
      console.log("pdf: ", pdf);
      console.log('PDF loaded');

      // Fetch the first page
      var pageNumber = 1;
      pdf.getPage(pageNumber).then(function (page) {
        console.log('Page loaded');

        var scale = 1.5;
        var viewport = page.getViewport({ scale: scale });

        // Prepare canvas using PDF page dimensions
        var canvas: any = document.getElementById('the-canvas');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        var renderTask = page.render(renderContext);
        renderTask.promise.then(function () {
          var link = document.createElement('a');
          link.download = 'conversie.png';
          link.href = (document.getElementById('the-canvas') as HTMLCanvasElement).toDataURL()
          link.click();
        });
      });
    });
  }

}
