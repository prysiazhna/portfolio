import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appShrinkHeader]',
  standalone: true
})
export class ShrinkHeaderDirective {
  @Input() enableShrink: boolean = true;
  private initialHeight: string = '17vh';
  private shrunkHeight: string = '8vh';
  private scrollThreshold: number = 50;
  public innerWidth=0;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.removeStyle();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.innerWidth < 900) {
      this.renderer.removeStyle(this.el.nativeElement, 'height');
      return;
    }
    let calculatedHeight = window.pageYOffset > this.scrollThreshold ? this.shrunkHeight : this.initialHeight;
    this.renderer.setStyle(this.el.nativeElement, 'height', calculatedHeight);
  }

  public removeStyle(): void {
    if (this.innerWidth < 900) {
      this.renderer.removeStyle(this.el.nativeElement, 'height');
      return;
    }
  }
}
