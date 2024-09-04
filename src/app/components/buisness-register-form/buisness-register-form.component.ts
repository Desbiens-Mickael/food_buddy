import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AdresseJson, Feature } from '../../shared/models/AdresseJson';
import {
  Address,
  Business,
  BusinessAccount,
  Establishment,
} from '../../shared/models/Buisness';
import { User } from '../../shared/models/User';
import { UserInfo } from '../../shared/models/User-info.model';
import { AdresseService } from '../../shared/services/adresse.service';
import { AuthService } from '../../shared/services/auth.service';
import { BuisnessService } from '../../shared/services/buisness.service';
import { UserService } from '../../shared/services/user.service';
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
  ],
  templateUrl: './buisness-register-form.component.html',
  styleUrl: './buisness-register-form.component.css',
})
export class BuisnessRegisterFormComponent implements OnInit {
  isHiddenConfirmPassword = true;
  isHiddenPassword = true;

  private formBuilder = inject(FormBuilder);
  private adresseService = inject(AdresseService);
  private userService = inject(UserService);
  private businessService = inject(BuisnessService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private authService = inject(AuthService);
  private cdRef = inject(ChangeDetectorRef);
  userInfos!: UserInfo | null;

  villes!: AdresseJson;
  filteredVilles: Feature[] = [];
  selectedAdress!: Feature;
  suggestionsVisible = false;
  keepSuggestionsVisible = false;
  currentStep = 1;

  userForm!: FormGroup;
  buisnessForm!: FormGroup;
  establishmentForm!: FormGroup;

  addressForm = this.formBuilder.group({
    streetNumber: ['', Validators.required],
    streetName: ['', Validators.required],
    zipCode: ['', Validators.required],
    city: ['', Validators.required],
    latitude: [0, Validators.required],
    longitude: [0, Validators.required],
  });

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({});
    this.buisnessForm = this.formBuilder.group({});
    this.establishmentForm = this.formBuilder.group({});

    this.authService.userInfo$.subscribe(data => {
      this.userInfos = data;
    });

    this.cdRef.detectChanges();
  }

  togglePassword(): void {
    this.isHiddenPassword = !this.isHiddenPassword;
  }

  toggleConfirmPassword(): void {
    this.isHiddenConfirmPassword = !this.isHiddenConfirmPassword;
  }

  filter(event: Event): void {
    const newValue = (event.target as HTMLInputElement).value;
    if (newValue.length > 5) {
      this.adresseService.getAdresse(newValue, '10').subscribe(data => {
        this.villes = data;
        this.filteredVilles = this.villes.features;
        this.suggestionsVisible = this.filteredVilles.length > 0;
      });
    } else {
      this.filteredVilles = [];
      this.suggestionsVisible = false;
    }
  }

  showSuggestions(): void {
    this.suggestionsVisible = true;
  }

  hideSuggestions(): void {
    if (!this.keepSuggestionsVisible) {
      this.suggestionsVisible = false;
    }
  }

  selectAdress(ville: Feature): void {
    this.selectedAdress = ville;
    (document.getElementById('adresse-input') as HTMLInputElement).value =
      ville.properties.label;
    this.suggestionsVisible = false;
    this.addressForm.patchValue({
      streetNumber: ville.properties.housenumber,
      streetName: ville.properties.street,
      zipCode: ville.properties.postcode,
      city: ville.properties.city,
      latitude: ville.geometry.coordinates[1],
      longitude: ville.geometry.coordinates[0],
    });
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

  createBuisness(): void {
    if (
      this.userForm.valid &&
      this.buisnessForm.valid &&
      this.establishmentForm.valid &&
      this.addressForm.valid
    ) {
      const password = this.userForm.get('password.password')?.value;
      const lastname = this.userForm.get('lastName')?.value;
      const email = this.userForm.get('email')?.value;
      const firstname = this.userForm.get('firstName')?.value;
      if (password && lastname && firstname && email) {
        const newUser: User = {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
        };

        const business: Business = {
          name: this.buisnessForm.get('name')?.value ?? '',
          siren: this.buisnessForm.get('siren')?.value ?? '',
        };

        const establishment: Establishment = {
          name: this.establishmentForm.get('name')?.value ?? '',
          siret: this.establishmentForm.get('siret')?.value ?? '',
          email: this.establishmentForm.get('email')?.value ?? '',
          phoneNumber: this.establishmentForm.get('phoneNumber')?.value ?? '',
        };

        const address: Address = {
          streetNumber: this.addressForm.controls.streetNumber.value ?? '',
          streetName: this.addressForm.controls.streetName.value ?? '',
          zipCode: this.addressForm.controls.zipCode.value ?? '',
          city: this.addressForm.controls.city.value ?? '',
          latitude: this.addressForm.controls.latitude.value ?? 0,
          longitude: this.addressForm.controls.longitude.value ?? 0,
        };

        const buisness: BusinessAccount = {
          newUser,
          business,
          establishment,
          address,
        };

        this.businessService.createBuisnessAccount(buisness).subscribe({
          next: () => {
            this.userForm.reset();
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
}
