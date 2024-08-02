import {AfterViewInit, Component, Inject, PLATFORM_ID} from '@angular/core';
import {TechStack} from "@configs/skills.config";
import {CommonModule, isPlatformBrowser} from "@angular/common";
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.less'
})
export class SkillsComponent implements AfterViewInit {
  public techStack = TechStack;
  public techStackKeys = Object.keys(TechStack);

  constructor(@Inject(PLATFORM_ID) public platformId: Object) {
  }

  ngAfterViewInit(): void {
    this.setupGsap();
  }

  public setupGsap(): void {
    if (isPlatformBrowser(this.platformId)) {

      const container = document.querySelector('#skills .icons');
      if (container) {
        const scrollEnd = container.scrollWidth - container.clientWidth;
        gsap.to(container, {
          x: -scrollEnd,
          ease: 'none',
          scrollTrigger: {
            trigger: '#skills',
            start: 'top top',
            end: `+=${scrollEnd}`,
            scrub: true,
            pin: true,
            anticipatePin: 1
          }
        });
      }
    }
  }
}
