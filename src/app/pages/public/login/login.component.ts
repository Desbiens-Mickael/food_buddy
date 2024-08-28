import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserInfo } from '../../../shared/models/User-info.model';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isHidden = true;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.email?.value as string;
      const password = this.password?.value as string;

      this.authService.login(email, password).subscribe({
        next: (data: UserInfo) => {
          void this.router.navigate(['/']);
          this.loginForm.reset();
          this.toastr.success(
            `Bienvenue ${data.firstname} ${data.lastname}`,
            'Connexion réussie',
          );
        },
        error: (err: HttpErrorResponse) => {
          this.toastr.error(err.error.error_message as string);
        },
      });
    }
  }
  toggle() {
    this.isHidden = !this.isHidden;
  }
}
