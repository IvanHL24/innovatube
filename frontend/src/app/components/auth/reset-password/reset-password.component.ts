import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { ForgotPassword, ResetPassword } from '../../../core/models/user.model';
import { SessionService } from '../../../core/services/session.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, MatCardModule, MatFormField, MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  private fb = inject(FormBuilder);

  hidePassword = true;
  loading = false;

  reset = false;

  forgotForm = this.fb.nonNullable.group({
    username: ['', [
      Validators.required
    ]],
    email: ['', [
      Validators.required,
      Validators.email
    ]]
  })

  resetForm = this.fb.nonNullable.group({
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
    private sessionService: SessionService,
    private router: Router
  ) {}

  onSubmitForgot(): void {
    this.loading = true;
    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }

    const forgotPassword: ForgotPassword = this.forgotForm.getRawValue();

    this.sessionService.forgotPassword(forgotPassword).subscribe({
      next: (data) => {
        this.loading = false;
        this.reset = true;
        Swal.fire({
          title: 'Éxito',
          text: data.message,
          icon: 'success',
          confirmButtonText: 'Continuar'
        })
      },
      error: (error) => {
        this.loading = false;
        console.log(error)
        Swal.fire({
          title: 'Error',
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    })
  }

  onSubmitReset(): void {
    this.loading = true;
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }

    const resetPassword: ResetPassword = this.resetForm.getRawValue();

    this.sessionService.resetPassword(resetPassword).subscribe({
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
        console.log(error)
        Swal.fire({
          title: 'Error',
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    })
  }
}
