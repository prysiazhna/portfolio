import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {DefaultTheme, DefaultThemeColor} from "@configs/theme.config";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<string>(DefaultTheme);
  private colorSubject = new BehaviorSubject<string>(DefaultThemeColor);

  public theme$ = this.themeSubject.asObservable();
  public color$ = this.colorSubject.asObservable();

  public toggleTheme(): void {
    const newTheme = this.themeSubject.value === 'dark' ? 'light' : 'dark';
    this.themeSubject.next(newTheme);
    document.body.classList.toggle('light-theme', newTheme === 'light');
  }

  public changeColor(color: string): void {
    this.colorSubject.next(color);
    document.documentElement.style.setProperty('--theme-main-color', color);
  }
}
