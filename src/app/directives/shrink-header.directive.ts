import {AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appShrinkHeader]',
  standalone: true
})
export class ShrinkHeaderDirective implements AfterViewInit {
  @Input() enableShrink: boolean = true;
  public initialHeight: string = '17vh';
  public shrunkHeight: string = '8vh';
  public innerWidth = 0;
  public readonly scrollThreshold: number = 50;
  public readonly breakpoint: number = 900;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  public ngAfterViewInit(): void {
    this.innerWidth = this.el.nativeElement.offsetWidth;
  }

  @HostListener('window:resize', ['$event'])
  public onResize(): void {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < this.breakpoint) {
      this.removeStyle();
      return;
    }
  }

  @HostListener('window:scroll', [])
  public onWindowScroll(): void {
    if (this.innerWidth < this.breakpoint) {
      this.removeStyle();
      return;
    }
    let calculatedHeight = window.pageYOffset > this.scrollThreshold ? this.shrunkHeight : this.initialHeight;
    this.renderer.setStyle(this.el.nativeElement, 'height', calculatedHeight);
  }

  public removeStyle(): void {
    this.renderer.removeStyle(this.el.nativeElement, 'height');
  }
}
