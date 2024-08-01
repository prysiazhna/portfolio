import {Directive, HostListener, Input, Output, EventEmitter} from '@angular/core';
import {MenuItems} from "@configs/menu.config";
import {MenuItemsModel} from "@models/common.models";

@Directive({
  selector: '[appScrollSpy]',
  standalone: true
})
export class ScrollSpyDirective {
  public menuItems: MenuItemsModel[] = MenuItems;
  private _activeSection: string = '';

  @Input()
  set activeSection(value: string) {
    this._activeSection = value;
  }
  @Output() activeSectionChange = new EventEmitter<string>();

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    let currentSection = '';
    this.menuItems.forEach(item => {
      const sectionElement = document.getElementById(item.section);
      if (sectionElement) {
        const rect = sectionElement.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentSection = item.section;
        }
      }
    });
    this.activeSection = currentSection;
    this.activeSectionChange.emit(this._activeSection);
  }
}
