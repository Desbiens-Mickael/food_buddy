import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UpdateUser, User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import * as Valid from '../../shared/validator/validator';
import { UploadFileComponent } from '../upload-file/upload-file.component';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, UploadFileComponent],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  isHiddenPassword = true;
  isHiddenConfirmPassword = true;
  submitted = false;

  @Input() userInfos?: UpdateUser;
  @Input() parentForm?: FormGroup;

  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  formInit() {
    this.userForm = this.formBuilder.group({
      firstName: [this.userInfos?.firstname ?? '', Validators.required],
      lastName: [this.userInfos?.lastname ?? '', Validators.required],
      email: [
        this.userInfos?.email ?? '',
        [Validators.required, Valid.emailValidator()],
      ],
    });

    if (!this.userInfos) {
      this.userForm.addControl(
        'passwordGroup',
        this.formBuilder.group(
          {
            password: ['', [Validators.required, Valid.passwordValidator()]],
            confirmPassword: ['', Validators.required],
          },
          {
            validators: Valid.passwordMatchValidator(
              'password',
              'confirmPassword',
            ),
          },
        ),
      );
    }
  }

  ngOnInit(): void {
    this.formInit();

    if (this.parentForm) {
      this.parentForm.addControl('user', this.userForm);
    }
  }

  createUser(): void {
    const password = this.userForm.get('passwordGroup.password')?.value;
    const lastname = this.userForm.get('lastName')?.value;
    const email = this.userForm.get('email')?.value;
    const firstname = this.userForm.get('firstName')?.value;

    this.submitted = true;

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
        // Création du compte utilisateur
        this.userService.createUser(user as User).subscribe({
          next: () => {
            this.userForm.reset();
            this.toastr.success('Compte créé avec succès');
            void this.router.navigate(['/login']);
          },
          error: () => {
            this.toastr.error('Erreur lors de la création du compte');
          },
        });
      } else {
        // Modification du profil utilisateur
        this.userService.UpdateUser(user as UpdateUser).subscribe({
          next: () => {
            this.toastr.success('Profil modifié avec succès');
          },
          error: () => {
            this.toastr.error('Erreur lors de la modification du profil');
          },
        });
      }
    }
  }

  togglePassword(): void {
    this.isHiddenPassword = !this.isHiddenPassword;
  }

  toggleConfirmPassword(): void {
    this.isHiddenConfirmPassword = !this.isHiddenConfirmPassword;
  }
}
