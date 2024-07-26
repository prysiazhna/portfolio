import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ThemeSwitcherComponent} from "../../components/theme-switcher/theme-switcher.component";
import {HamburgerComponent} from "../../components/hamburger/hamburger.component";
import {ShrinkHeaderDirective} from "../../directives/shrink-header.directive";
import {map, Observable} from "rxjs";
import {ThemeService} from "../../components/theme-switcher/theme-switcher.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,ShrinkHeaderDirective, ThemeSwitcherComponent, HamburgerComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent {
  public isMenuActive = false;
  public isDarkTheme$: Observable<boolean>;

  constructor(
    private themeService: ThemeService
  ) {
    this.isDarkTheme$ = this.themeService.theme$.pipe(map(theme => theme === 'dark'));
  }

  public toggleMenu():void {
    this.isMenuActive = !this.isMenuActive;
    document.body.classList.toggle('no-scroll', this.isMenuActive);
  }
}
