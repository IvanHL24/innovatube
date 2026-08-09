import { Component, inject, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { RegisterRequest } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user.service';
import Swal from 'sweetalert2';

declare const grecaptcha: any;

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, MatCardModule, MatFormField, MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements AfterViewInit {

  private fb = inject(FormBuilder);

  @ViewChild('recaptchaContainer', { static: true })
  recaptchaContainer!: ElementRef;

  recaptchaSiteKey = '6LcSwXwtAAAAAM0HqiLBAyMtpc5nieTX-C61BHnS';
  recaptchaToken: string | null = null;

  hidePassword1 = true;
  hidePassword2 = true;
  loading = false;

  ngAfterViewInit(): void {
    if (typeof grecaptcha !== 'undefined') {
      grecaptcha.render(
        this.recaptchaContainer.nativeElement,
        {
          sitekey: this.recaptchaSiteKey,

          callback: (token: string) => {
            this.onCaptchaResolved(token);
          },

          'expired-callback': () => {
            this.onCaptchaExpired();
          },

          'error-callback': () => {
            this.onCaptchaError();
          }
        }
      );
    }
  }

  registerForm = this.fb.nonNullable.group({
    first_name: ['', [
      Validators.required
    ]],
    last_name: ['', [
      Validators.required
    ]],
    username: ['', [
      Validators.required
    ]],
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(8)
    ]],
    confirmPassword: ['', [
      Validators.required,
    ]]
  }, {
    validators: this.passwordMatchValidator
  })

  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true};
  }

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    if (!this.recaptchaToken) {
      Swal.fire({
        title: 'Captcha requerido',
        text: 'Completa la verificación de reCAPTCHA.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    this.loading = true;

    const registerRequest: RegisterRequest = {
      ...this.registerForm.getRawValue(),
    recaptchaToken: this.recaptchaToken};

    this.userService.register(registerRequest).subscribe({
      next: (data) => {
        this.loading = false;
        Swal.fire({
          title: 'Éxito',
          text: data.message,
          icon: 'success',
          confirmButtonText: 'Ir a inicio de sesión'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/auth/login'])
          }          
        })
      },
      error: (error) => {
        this.loading = false;
        Swal.fire({
          title: 'Error',
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    })
  }

  onCaptchaResolved(token: string): void {
    this.recaptchaToken = token;
  }

  onCaptchaExpired(): void {
    this.recaptchaToken = null
  }

  onCaptchaError(): void {
    this.recaptchaToken = null;
  }

}
