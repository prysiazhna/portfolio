import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-hamburger',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hamburger.component.html',
  styleUrl: './hamburger.component.less'
})
export class HamburgerComponent {
  @Input() public isActive = false;
  @Output() public toggled = new EventEmitter<void>();

  public toggle(): void {
    this.isActive = !this.isActive;
    this.toggled.emit();
  }
}
