import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SessionService } from '../../../core/services/session.service';
import { Router, RouterLink } from '@angular/router';
import { LoginRequest } from '../../../core/models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private fb = inject(FormBuilder)

  hidePassword = true;
  loading = false;

  loginForm = this.fb.nonNullable.group({
    identifier: ['', [
      Validators.required,
    ]],
    password: ['', [
      Validators.required,
    ]]
  })

  constructor(
    private sessionService: SessionService,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.loading = true;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    
    const loginRequest: LoginRequest = this.loginForm.getRawValue();
    

    this.sessionService.login(loginRequest).subscribe({
      next: (data) => {
        this.loading = false;
        localStorage.setItem('token', data.token);
        this.router.navigate(['/']);
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
}
