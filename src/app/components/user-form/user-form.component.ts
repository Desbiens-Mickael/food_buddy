import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import * as Valid from '../../shared/validator/validator';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  isHidden = true;

  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);

  userForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Valid.emailValidator()]],
    password: this.formBuilder.group(
      {
        password: ['', [Validators.required, Valid.passwordValidator()]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: Valid.passwordMatchValidator('password', 'confirmPassword'),
      },
    ),
  });
  createUser(): void {
    const password = this.userForm.get('password.password')?.value;
    const lastname = this.userForm.get('lastName')?.value;
    const email = this.userForm.get('email')?.value;
    const firstname = this.userForm.get('firstName')?.value;
    if (this.userForm.valid && password && lastname && firstname && email) {
      const user: User = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      };

      this.userService.createUser(user).subscribe({
        next: () => {
          this.userForm.reset();
          void this.router.navigate(['/login']);
        },
        error: error => {
          console.error('Erreur lors de la requête POST :', error);
        },
      });
    }
  }
}
