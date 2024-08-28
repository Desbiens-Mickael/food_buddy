import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AdresseJson, Feature } from '../../shared/models/AdresseJson';
import {
  Address,
  Buisness,
  Business,
  Establishment,
} from '../../shared/models/Buisness';
import { User } from '../../shared/models/User';
import { UserInfo } from '../../shared/models/User-info.model';
import { AdresseService } from '../../shared/services/adresse.service';
import { AuthService } from '../../shared/services/auth.service';
import { BuisnessService } from '../../shared/services/buisness.service';
import { UserService } from '../../shared/services/user.service';
import * as Valid from '../../shared/validator/validator';
import { UploadFileComponent } from '../upload-file/upload-file.component';

@Component({
  selector: 'app-buisness-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ToastrModule,
    UploadFileComponent,
  ],
  templateUrl: './buisness-form.component.html',
  styleUrls: ['./buisness-form.component.css'],
})
export class BuisnessFormComponent implements OnInit {
  isHiddenConfirmPassword = true;
  isHiddenPassword = true;

  private formBuilder = inject(FormBuilder);
  private adresseService = inject(AdresseService);
  private userService = inject(UserService);
  private businessService = inject(BuisnessService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private authService = inject(AuthService);
  // private avatar?: File;
  // private businessLogo?: File;
  userInfos!: UserInfo | null;

  myControl = new FormControl('');
  villes!: AdresseJson;
  filteredVilles: Feature[] = [];
  selectedAdress!: Feature;
  suggestionsVisible = false;
  keepSuggestionsVisible = false;
  currentStep = 1;

  userForm = this.formBuilder.group({
    firstName: ['t', Validators.required],
    lastName: ['t', Validators.required],
    email: ['t@gmail.com', [Validators.required, Valid.emailValidator()]],
    password: this.formBuilder.group(
      {
        password: [
          'Azerty01@;',
          [Validators.required, Valid.passwordValidator()],
        ],
        confirmPassword: ['Azerty01@;', Validators.required],
      },
      {
        validators: Valid.passwordMatchValidator('password', 'confirmPassword'),
      },
    ),
  });

  buisnessForm = this.formBuilder.group({
    name: ['t', Validators.required],
    siren: ['222222222', [Validators.required, Valid.sirenValidator()]],
  });

  establishmentForm = this.formBuilder.group({
    name: ['t', Validators.required],
    siret: ['22222', [Validators.required, Valid.siretValidator()]],
    email: ['r@gmail.com', [Validators.required, Valid.emailValidator()]],
    phoneNumber: ['0600000000', Validators.required],
  });

  addressForm = this.formBuilder.group({
    streetNumber: ['', Validators.required],
    streetName: ['', Validators.required],
    zipCode: ['', Validators.required],
    city: ['', Validators.required],
    latitude: [0, Validators.required],
    longitude: [0, Validators.required],
  });

  ngOnInit(): void {
    this.authService.userInfo$.subscribe(data => {
      this.userInfos = data;
    });
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
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.toggleStep(this.currentStep, this.currentStep - 1);
      this.currentStep--;
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

  // onFileDropped(fileList: FileList) {
  //   this.avatar = fileList[0];
  // }

  // onFileDroppedBusinessLogo(fileListLogo: FileList) {
  //   this.businessLogo = fileListLogo[0];
  // }

  // onErrorOccurred(error: string) {
  //   console.log(error);
  // }

  // onErrorOccurredBusinessLogo(errorLogo: string) {
  //   console.log(errorLogo);
  // }

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
          name: this.buisnessForm.controls.name.value ?? '',
          siren: this.buisnessForm.controls.siren.value ?? '',
        };

        const establishment: Establishment = {
          name: this.establishmentForm.controls.name.value ?? '',
          siret: this.establishmentForm.controls.siret.value ?? '',
          email: this.establishmentForm.controls.email.value ?? '',
          phoneNumber: this.establishmentForm.controls.phoneNumber.value ?? '',
        };

        const address: Address = {
          streetNumber: this.addressForm.controls.streetNumber.value ?? '',
          streetName: this.addressForm.controls.streetName.value ?? '',
          zipCode: this.addressForm.controls.zipCode.value ?? '',
          city: this.addressForm.controls.city.value ?? '',
          latitude: this.addressForm.controls.latitude.value ?? 0,
          longitude: this.addressForm.controls.longitude.value ?? 0,
        };

        const buisness: Buisness = {
          newUser,
          business,
          establishment,
          address,
        };

        this.businessService
          .createBuisness(buisness)
          // .pipe(
          //   concatMap((data: BusinessWithEstablishment) => {
          //     console.log('avatar', data.Business);
          //     if (this.avatar) {
          //       return this.userService.uploadAvatar(
          //         this.avatar,
          //         'test@gmail.com', // TODO: get email from user
          //       );
          //     }
          //     return of(data); // If no avatar, proceed with `data`
          //   }),
          //   concatMap(data => {
          //     if (this.businessLogo) {
          //       return this.businessService.uploadBusinessLogo(
          //         this.businessLogo,
          //         '1',
          //       );
          //     }
          //     return of(data); // If no logo, proceed with `data`
          //   }),
          // )
          .subscribe({
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
