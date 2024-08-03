import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import {CommonModule, isPlatformBrowser} from "@angular/common";
import {TimelineItems} from "@configs/experience.config";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {TimelineItemModel} from "@models/common.models";

gsap.registerPlugin(ScrollTrigger);
interface AnimationProperties {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.less'
})
export class ExperienceComponent implements AfterViewInit {
  public timelineItems: TimelineItemModel[] = TimelineItems;
  @ViewChild('timeline') timeline: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
  }

  public ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.animateTimelineItems();
    }
  }

  private animateElement(element: Element, properties: AnimationProperties, index: number, delayOffset: number): void {
    gsap.fromTo(element, properties.from, {
      ...properties.to,
      scrollTrigger: {
        trigger: element.closest('.timeline-item'),
        start: 'top 80%',
        end: 'bottom top',
        toggleActions: 'play none none reverse',
      },
      delay: index * 0.2 + delayOffset
    });
  }

  private animateTimelineItems(): void {
    const items = this.timeline.nativeElement.querySelectorAll('.timeline-item');

    items.forEach((item: Element, index: number) => {
      const contentElement = item.querySelector('.timeline-content');
      const iconElement = item.querySelector('.timeline-icon');

      if (contentElement) {
        const direction = contentElement.classList.contains('right') ? 50 : -50;

        this.animateElement(contentElement, {
          from: { autoAlpha: 0, x: direction },
          to: { autoAlpha: 1, x: 0, duration: 0.6, ease: 'power2.out' }
        }, index, 0);
      }

      if (iconElement) {
        this.animateElement(iconElement, {
          from: { scale: 0 },
          to: { scale: 1, duration: 0.7, ease: 'power2.out' }
        }, index, 0.3);
      }
    });
  }

}

