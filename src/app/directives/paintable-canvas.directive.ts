import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[paintable-canvas]'
})
export class PaintableCanvasDirective {
  private el = inject(ElementRef);

  canvas;
  ctx;
  isDrawing = false;
  lastX = 0;
  lastY = 0;
  hue = 100
  direction = true;


  @HostListener('mousedown',['$event'])
  onMouseDown(e:any){
    this.isDrawing = true;
    this.lastX = e.offsetX;
    this.lastY = e.offsetY;
  }

   @HostListener('mouseup')
    onMouseUp(){
     this.isDrawing = false;
    }

    @HostListener('mouseout')
    onMouseOut(){
     this.isDrawing = false;
    }

  @HostListener('mousemove',['$event'])
  onMouseMove(e:any){
    this.draw(e);
  }

  constructor() { 
    this.canvas = this.el.nativeElement;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.strokeStyle = '#000000'
    this.ctx.lineJoin = 'round'
    this.ctx.lineCap = 'round'
    this.ctx.lineWidth = 1000  


   
  }



  draw(e:any){

    if(!this.isDrawing) return;
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX,this.lastY)
    this.ctx.lineTo(e.offsetX,e.offsetY)
    this.ctx.stroke();
    this.lastX = e.offsetX;
    this.lastY = e.offsetY;
  }
}
