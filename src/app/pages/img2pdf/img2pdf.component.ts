import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { jsPDF } from "jspdf";


@Component({
  selector: 'app-img2pdf',
  imports: [NzIconModule, NzButtonModule],
  templateUrl: './img2pdf.component.html',
  styleUrl: './img2pdf.component.less'
})
export class Img2pdfComponent {


  @ViewChild('nativeInput') nativeInput: ElementRef | undefined;
  openFileDialog() {
    this.nativeInput?.nativeElement.click();
  }

  eventHandler(event: any) {
    console.log(event.target.files[0])

    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
      this.createPdf(fileReader.result)
    }
    fileReader.readAsDataURL(event.target.files[0]);
  }



  createPdf(file: any) {
    {
      var image = new Image();
      const pdfImageProps = {
        width: 0,
        height: 0,
        x: 0,
        y: 0
      }


      image.onload = function () {
        var doc = new jsPDF('p', 'pt', 'a4');
        var documentProps = {
          width: doc.internal.pageSize.getWidth(),
          height: doc.internal.pageSize.getHeight()

        }

        var ratio = image.height / image.width;
        const paddingY = 10;
        const paddingX = 10;
        pdfImageProps.width = documentProps.width - (2 * paddingX);
        pdfImageProps.height = (documentProps.width - (2 * paddingY)) * ratio,
        pdfImageProps.x = paddingX,
        pdfImageProps.y = (documentProps.height - pdfImageProps.height) / 2

        if(pdfImageProps.height > (documentProps.height - (2*paddingY)) ){
          var reduceRatio =  (documentProps.height - (2*paddingY)) / pdfImageProps.height;

          console.log(reduceRatio)
          pdfImageProps.width = pdfImageProps.width * reduceRatio;
          pdfImageProps.height = pdfImageProps.height * reduceRatio;
          pdfImageProps.x = (documentProps.width - pdfImageProps.width) / 2,
          pdfImageProps.y = (documentProps.height - pdfImageProps.height) / 2
        }


        doc.addImage(file, pdfImageProps.x, pdfImageProps.y, pdfImageProps.width, pdfImageProps.height);
        doc.save('converted.pdf')
      };

      image.src = file;
    }
  }
}
