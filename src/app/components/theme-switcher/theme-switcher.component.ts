import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ThemeService} from "./theme-switcher.service";
import {map, Observable} from "rxjs";
import { DOCUMENT } from '@angular/common';
import {animate, style, transition, trigger} from "@angular/animations";
import {ColorOptionsModel} from "../../models/common.models";
import {ColorOptions} from "../../configs/theme.config";

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.less',
  animations: [
    trigger('paletteItemAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('200ms {{delay}}ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
      ], { params: { delay: 0 } }),
      transition(':leave', [
        animate('200ms ease-out', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
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
    this.themeIcon$ = this.themeService.theme$.pipe(
      map(theme => theme === 'dark' ? 'ico icon-sun' :'ico icon-brightness_3')
    );
    this.themeColor$ = this.themeService.color$;
  }

  public ngOnInit(): void {
    this.themeColor$.subscribe(color => {
      this.document.documentElement.style.setProperty('--theme-color', color);
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
