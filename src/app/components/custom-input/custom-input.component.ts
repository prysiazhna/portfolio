import {Component, Input, forwardRef, Inject, PLATFORM_ID} from '@angular/core';
import {ReactiveFormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule} from "@angular/forms";
import {CommonModule, isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,FormsModule, CommonModule
  ],
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ]
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input() public label: string;
  @Input() public controlName: string;
  @Input() public errors: string[] = [];

  public value: string = '';
  public isActive: boolean = false;
  public onChange: any = ():void => {};
  public onTouched: any = ():void => {};

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
  }
  public writeValue(value: string): void {
    this.value = value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    this.onTouched();
    this.updateLabelState();
  }

  public onFocus(): void {
    this.isActive = true;
  }

  public onBlur(): void {
    this.updateLabelState();
  }

  private updateLabelState(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isActive = this.value.length > 0 || document.activeElement === document.getElementById(this.controlName);
    }
  }
}
