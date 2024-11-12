import {Component, AfterViewInit, PLATFORM_ID, Inject} from '@angular/core';
import gsap from 'gsap';
import {CommonModule, isPlatformBrowser} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.less'],
  imports: [CommonModule],
})
export class AvatarComponent implements AfterViewInit {
  private xPosition: number | undefined;
  private yPosition: number | undefined;
  private storedXPosition: number = 0;
  private storedYPosition: number = 0;
  private height: number = 0;
  private width: number = 0;


  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const meTl = gsap.timeline({
        onComplete: () => this.addMouseEvent(),
        delay: 1
      });

      gsap.set(".bg", { transformOrigin: "50% 50%" });
      gsap.set(".me", { opacity: 1 });

      meTl
        .from(".me", { duration: 1, yPercent: 100, ease: "elastic.out(0.5, 0.4)" }, 0.5)
        .from(".head , .hair , .shadow", { duration: 0.9, yPercent: 20, ease: "elastic.out(0.58, 0.25)" }, 0.6);

      this.height = window.innerHeight;
      this.width = window.innerWidth;
      this.createBlinkAnimation();

      window.addEventListener("resize", () => this.updateWindowSize());
    }
  }

  private addMouseEvent(): void {
    if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      window.addEventListener("mousemove", (event) => this.updateScreenCoords(event));
      (gsap.ticker as any).add(() => this.animateFace());
    }
  }

  private updateScreenCoords(event: MouseEvent): void {
    this.xPosition = event.clientX;
    this.yPosition = event.clientY;
  }

  private animateFace(): void {
    if (!this.xPosition && !this.yPosition) return;

    const x = (100 * (this.xPosition ?? 0) / this.width) - 50;
    const y = (100 * (this.yPosition ?? 0) / this.height) - 50;
    const yHigh = y - 20;
    const yLow = y - 80;

    gsap.to(".face", { yPercent: yLow / 100, xPercent: x / 60 });
    gsap.to(".eye", { yPercent: yHigh / 5, xPercent: x / 4 });
    gsap.to(".inner-face", { yPercent: y / 10, xPercent: x / 12 });
    gsap.to(".hair-front", { yPercent: yHigh / 30, xPercent: x / 40 });
    gsap.to([".hair-back", ".shadow"], { yPercent: -yLow / 40, xPercent: -x / 40 });
    gsap.to([".eyebrow-left", ".eyebrow-right"], { yPercent: y / 5, xPercent: x / 10 });


    this.storedXPosition = this.xPosition ?? 0;
    this.storedYPosition = this.yPosition ?? 0;
  }

  private createBlinkAnimation(): void {
    const blink = gsap.timeline({ repeat: -1, repeatDelay: 5, paused: true });
    blink
      .to(".eye-right, .eye-left", { duration: 0.01, opacity: 0 }, 0)
      .to(".eye-right-2, .eye-left-2", { duration: 0.01, opacity: 1 }, 0)
      .to(".eye-right, .eye-left", { duration: 0.01, opacity: 1 }, 0.15)
      .to(".eye-right-2 , .eye-left-2", { duration: 0.01, opacity: 0 }, 0.15)
      .play();
  }

  private updateWindowSize(): void {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
  }
}
