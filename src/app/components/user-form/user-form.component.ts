import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User, UpdateUser } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import * as Valid from '../../shared/validator/validator';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  isHidden = true;
  @Input() userInfos?: UpdateUser;
  userForm!: FormGroup;

  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);

  formInit() {
    this.userForm = this.formBuilder.group({
      firstName: [this.userInfos?.firstname ?? '', Validators.required],
      lastName: [this.userInfos?.lastname ?? '', Validators.required],
      email: [
        this.userInfos?.email ?? '',
        [Validators.required, Valid.emailValidator()],
      ],
    });

    const password: FormGroup = this.formBuilder.group(
      {
        password: ['', [Validators.required, Valid.passwordValidator()]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: Valid.passwordMatchValidator('password', 'confirmPassword'),
      },
    );

    if (!this.userInfos) {
      this.userForm.addControl('password', password);
    }
  }

  ngOnInit() {
    this.formInit();
  }

  createUser(): void {
    const password =
      (this.userForm.get('password.password')?.value as string) || '';
    const lastname = this.userForm.get('lastName')?.value as string;
    const email = this.userForm.get('email')?.value as string;
    const firstname = this.userForm.get('firstName')?.value as string;

    if (this.userForm.valid) {
      let user: User | UpdateUser;
      if (this.userInfos) {
        user = {
          firstname: firstname,
          lastname: lastname,
          email: email,
        };
      } else {
        user = {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
        };
      }

      if (!this.userInfos) {
        this.userService.createUser(user as User).subscribe({
          next: () => {
            this.userForm.reset();
            void this.router.navigate(['/login']);
          },
          error: error => {
            console.error('Erreur lors de la requête POST :', error);
          },
        });
      } else {
        this.userService.UpdateUser(user as UpdateUser).subscribe({
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
}
