import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import * as Valid from '../../shared/validator/validator';
import { User } from '../../shared/models/User';
import { CommonModule } from '@angular/common';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);

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
    const password = this.userForm.controls.password.get('password')?.value;
    const lastname = this.userForm.controls.password.get('password')?.value;
    const email = this.userForm.controls.password.get('password')?.value;
    const firstname = this.userForm.controls.password.get('password')?.value;
    if (this.userForm.valid && password && lastname && firstname && email) {
      const user: User = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      };
      console.log('Formulaire envoyé avec succès !', user);

      this.userService.createUser(user).subscribe(
        response => {
          console.log('Requête POST réussie :', response);
        },
        error => {
          console.error('Erreur lors de la requête POST :', error);
        },
      );
    } else {
      console.log('Formulaire incomplet');
    }
  }
}
