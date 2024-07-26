import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {DefaultTheme, DefaultThemeColor} from "../../configs/theme.config";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<string>(DefaultTheme);
  private colorSubject = new BehaviorSubject<string>(DefaultThemeColor);

  theme$ = this.themeSubject.asObservable();
  color$ = this.colorSubject.asObservable();

  toggleTheme() {
    const newTheme = this.themeSubject.value === 'light' ? 'dark' : 'light';
    this.themeSubject.next(newTheme);
    document.body.classList.toggle('dark-theme', newTheme === 'dark');
  }

  changeColor(color: string) {
    this.colorSubject.next(color);
    document.documentElement.style.setProperty('--theme-color', color);
  }
}
