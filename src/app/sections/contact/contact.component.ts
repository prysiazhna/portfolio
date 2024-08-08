import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from '@angular/common';
import {CustomInputComponent} from "@components/custom-input/custom-input.component";
import {CustomTextareaComponent} from "@components/custom-textarea/custom-textarea.component";
import emailjs from '@emailjs/browser';
import {environment} from "@env/environment";
import {CustomToastrService} from "@services/toastr.service";
import {ToastrType} from "@models/common.enums";
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CustomInputComponent,
    CustomTextareaComponent
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less']
})
export class ContactComponent{
public contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastrService: CustomToastrService
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  public getErrors(controlName: string): string[] {
    const control = this.contactForm.get(controlName);
    if (control?.dirty && control.invalid) {
      const controlErrors = control.errors ?? {};
      return Object.keys(controlErrors).map(errorKey => this.getErrorMessage(controlName, errorKey, controlErrors[errorKey]));
    }
    return [];
  }

  private getErrorMessage(controlName: string, errorKey: string, errorValue: any): string {
    const fieldName = this.capitalize(controlName);
    const errorMessages: { [key: string]: string } = {
      'required': `${fieldName} is required`,
      'minlength': `${fieldName} must be at least ${errorValue.requiredLength} characters long`,
      'email': 'Invalid email address'
    };
    return errorMessages[errorKey] || '';
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  public onSubmit(): void {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      this.sendEmail(formData);
      this.contactForm.reset();
    }
  }

  private sendEmail(formData: any): void {
    emailjs.init(environment.emailjs.userID);
    emailjs.send(environment.emailjs.serviceID, environment.emailjs.templateID, {
      from_name: formData.name,
      message: formData.message,
      from_email: formData.email,
    }).then(
      () => {
        this.toastrService.showToastr(ToastrType.Success,'Email has been sent','SUCCESS' )
      },
      () => {
        this.toastrService.showToastr(ToastrType.Error,'Email has not been sent','FAILED' )
      },
    );
  }
}
