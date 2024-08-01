import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ThemeSwitcherComponent} from "@components/theme-switcher/theme-switcher.component";
import {HamburgerComponent} from "@components/hamburger/hamburger.component";
import {ShrinkHeaderDirective} from "@directives/shrink-header.directive";
import {map, Observable} from "rxjs";
import {ThemeService} from "@components/theme-switcher/theme-switcher.service";
import {MenuItems} from "@configs/menu.config";
import {RouterLink} from "@angular/router";
import {ScrollSpyDirective} from "@directives/scroll-spy.directive";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ShrinkHeaderDirective, ScrollSpyDirective, ThemeSwitcherComponent, HamburgerComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent {
  public isMenuActive = false;
  public isDarkTheme$: Observable<boolean>;
  public activeSection: string = '';
  public menuItems = MenuItems;

  constructor(
    private themeService: ThemeService
  ) {
    this.isDarkTheme$ = this.themeService.theme$.pipe(map(theme => theme === 'dark'));
  }

  public toggleMenu(): void {
    this.isMenuActive = !this.isMenuActive;
    document.body.classList.toggle('no-scroll', this.isMenuActive);
  }

  public scrollTo(section: string): void {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({behavior: 'smooth', block: 'start'});
      this.setActiveSection(section);
      this.closeMenuIfActive();
    }
  }

  public scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.setActiveSection('');
    this.closeMenuIfActive();
  }

  private setActiveSection(section: string): void {
    this.activeSection = section;
  }

  private closeMenuIfActive(): void {
    if (this.isMenuActive) {
      this.toggleMenu();
    }
  }
}
