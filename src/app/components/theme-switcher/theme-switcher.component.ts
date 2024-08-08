import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ThemeService} from "./theme-switcher.service";
import {map, Observable} from "rxjs";
import { DOCUMENT } from '@angular/common';
import {ColorOptionsModel} from "@models/common.models";
import {ColorOptions} from "@configs/theme.config";

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.less'
})
export class ThemeSwitcherComponent implements OnInit{
  public themeIcon$: Observable<string>;
  public themeColor$: Observable<string>;
  public showPalette: boolean = false;
  public colorOptions: ColorOptionsModel[] = ColorOptions;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private themeService: ThemeService
  ) {
    this.getTheme();
  }

  public ngOnInit(): void {
    this.setThemeColor();
  }

  public getTheme(): void {
    this.themeColor$ = this.themeService.color$;
    this.themeIcon$ = this.themeService.theme$.pipe(
      map(theme => theme === 'dark' ? 'ico icon-sun' :'ico icon-brightness_3')
    );
  }

  private setThemeColor(): void {
    this.themeColor$.subscribe(color => {
      this.document.documentElement.style.setProperty('--theme-main-color', color);
    });
  }

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  public togglePalette(): void {
    this.showPalette = !this.showPalette;
  }

  public changeColor(color: string): void {
    this.themeService.changeColor(color);
    this.showPalette = false;
  }
}
