import {Component, EventEmitter, Output} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-hamburger',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hamburger.component.html',
  styleUrl: './hamburger.component.less'
})
export class HamburgerComponent {
  isActive = false;

  @Output() toggled = new EventEmitter<void>();

  toggle() {
    this.isActive = !this.isActive;
    this.toggled.emit();
  }
}
