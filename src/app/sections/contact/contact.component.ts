import {Component} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {CommonModule} from '@angular/common';
import {CustomInputComponent} from "@components/custom-input/custom-input.component";
import {CustomTextareaComponent} from "@components/custom-textarea/custom-textarea.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    CustomInputComponent,
    CustomTextareaComponent
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less']
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public http: HttpClient,
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

   get f() {
    return this.contactForm.controls;
  }

  getErrors(controlName: string): string[] {
    const control = this.contactForm?.get(controlName);
    const errors: string[] = [];
    if (control && control.dirty && control.invalid) {
      const controlErrors = control.errors ?? {};

      if (controlErrors['required']) {
        errors.push(`${this.capitalize(controlName)} is required`);
      }
      if (controlErrors['minlength']) {
        errors.push(`${this.capitalize(controlName)} must be at least ${controlErrors['minlength'].requiredLength} characters long`);
      }
      if (controlErrors['email']) {
        errors.push(`Invalid email address`);
      }
      return errors;
    }
    return [];
  }

  public capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }



  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      this.sendEmail(formData).subscribe(
        response => console.log('Email sent successfully', response),
        error => console.error('Error sending email', error)
      );
    }
  }

  sendEmail(formData: any) {
    const emailData = {
      to: 'your-email@example.com',
      subject: 'Contact Form Submission',
      text: `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`
    };
    return this.http.post('https://your-email-api-endpoint', emailData);
  }
}
