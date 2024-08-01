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
    const newTheme = this.themeSubject.value === 'light' ? 'dark' : 'light';
    this.themeSubject.next(newTheme);
    document.body.classList.toggle('dark-theme', newTheme === 'dark');
  }

  public changeColor(color: string): void {
    this.colorSubject.next(color);
    document.documentElement.style.setProperty('--theme-color', color);
  }
}
