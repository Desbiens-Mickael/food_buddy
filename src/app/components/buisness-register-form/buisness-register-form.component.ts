import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import {
  Address,
  Business,
  BusinessAccount,
  Establishment,
} from '../../shared/models/Buisness';
import { User } from '../../shared/models/User';
import { UserInfo } from '../../shared/models/User-info.model';
import { AuthService } from '../../shared/services/auth.service';
import { BuisnessService } from '../../shared/services/buisness.service';
import { AddressFormComponent } from '../address-form/address-form.component';
import { BuisnessFormComponent } from '../buisness-form/buisness-form.component';
import { EstablishmentFormComponent } from '../establishment-form/establishment-form.component';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-buisness-register-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ToastrModule,
    UploadFileComponent,
    UserFormComponent,
    BuisnessFormComponent,
    EstablishmentFormComponent,
    AddressFormComponent,
    AddressFormComponent,
  ],
  templateUrl: './buisness-register-form.component.html',
  styleUrl: './buisness-register-form.component.css',
})
export class BuisnessRegisterFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private businessService = inject(BuisnessService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private authService = inject(AuthService);
  private cdRef = inject(ChangeDetectorRef);
  userInfos!: UserInfo | null;
  businessAccountForm!: FormGroup;
  currentStep = 1;

  ngOnInit(): void {
    this.businessAccountForm = this.formBuilder.group({});

    this.authService.userInfo$.subscribe(data => {
      this.userInfos = data;
    });

    this.cdRef.detectChanges();
  }

  nextStep(): void {
    if (this.currentStep < 4) {
      this.toggleStep(this.currentStep, this.currentStep + 1);
      this.currentStep++;

      this.cdRef.detectChanges();
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.toggleStep(this.currentStep, this.currentStep - 1);
      this.currentStep--;

      this.cdRef.detectChanges();
    }
  }

  toggleStep(current: number, next: number): void {
    const currentStepElement = document.querySelector(
      `.blockForm.step-${current.toString()}`,
    );
    const nextStepElement = document.querySelector(
      `.blockForm.step-${next.toString()}`,
    );

    if (currentStepElement && nextStepElement) {
      currentStepElement.classList.remove('active');
      setTimeout(() => {
        nextStepElement.classList.add('active');
      }, 300);
    }
  }

  getControlValue(form: FormGroup, path: string) {
    return form.get(path)?.value || null;
  }

  createBuisness(): void {
    if (this.businessAccountForm.valid) {
      const newUser: User = {
        firstname: this.getControlValue(
          this.businessAccountForm,
          'user.firstName',
        ),
        lastname: this.getControlValue(
          this.businessAccountForm,
          'user.lastName',
        ),
        email: this.getControlValue(this.businessAccountForm, 'user.email'),
        password: this.getControlValue(
          this.businessAccountForm,
          'user.passwordGroup.password',
        ),
      };

      const business: Business = {
        name: this.getControlValue(this.businessAccountForm, 'business.name'),
        siren: this.getControlValue(this.businessAccountForm, 'business.siren'),
      };

      const establishment: Establishment = {
        name: this.getControlValue(
          this.businessAccountForm,
          'establishment.name',
        ),
        siret: this.getControlValue(
          this.businessAccountForm,
          'establishment.siret',
        ),
        email: this.getControlValue(
          this.businessAccountForm,
          'establishment.email',
        ),
        phoneNumber: this.getControlValue(
          this.businessAccountForm,
          'establishment.phoneNumber',
        ),
      };

      const address: Address = {
        streetNumber: this.getControlValue(
          this.businessAccountForm,
          'address.streetNumber',
        ),
        streetName: this.getControlValue(
          this.businessAccountForm,
          'address.streetName',
        ),
        zipCode: this.getControlValue(
          this.businessAccountForm,
          'address.zipCode',
        ),
        city: this.getControlValue(this.businessAccountForm, 'address.city'),
        latitude: this.getControlValue(
          this.businessAccountForm,
          'address.latitude',
        ),
        longitude: this.getControlValue(
          this.businessAccountForm,
          'address.longitude',
        ),
      };

      const buisnessAccount: BusinessAccount = {
        newUser,
        business,
        establishment,
        address,
      };

      this.businessService.createBuisnessAccount(buisnessAccount).subscribe({
        next: () => {
          this.businessAccountForm.reset();
          void this.router.navigate(['/login']);
          this.toastr.success('Création de compte réussie');
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.error as string);
        },
      });
    }
  }
}
