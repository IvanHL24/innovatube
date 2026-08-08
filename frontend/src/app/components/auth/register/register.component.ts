import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, MatCardModule, MatFormField, MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private fb = inject(FormBuilder);

  hidePassword = true;
  loading = false;

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
    this.loading = true;
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const registerRequest: RegisterRequest = this.registerForm.getRawValue();

    this.userService.register(registerRequest).subscribe({
      next: (data) => {
        this.loading = false;
        Swal.fire({
          title: 'Éxito',
          text: 'Registro exitoso',
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
          text: 'Error al registrarse',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    })
  }

}
