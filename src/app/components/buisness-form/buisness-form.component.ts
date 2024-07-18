import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AdresseJson, Feature } from '../../shared/models/AdresseJson';
import {
  Address,
  Buisness,
  Business,
  Establishment,
  User,
} from '../../shared/models/Buisness';
import { AdresseService } from '../../shared/services/adresse.service';
import { BuisnessService } from '../../shared/services/buisness.service';
import * as Valid from '../../shared/validator/validator';

@Component({
  selector: 'app-buisness-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './buisness-form.component.html',
  styleUrls: ['./buisness-form.component.css'],
})
export class BuisnessFormComponent {
  private formBuilder = inject(FormBuilder);
  private adresseService = inject(AdresseService);
  private buisnessService = inject(BuisnessService);
  private router = inject(Router);
  myControl = new FormControl('');
  villes!: AdresseJson;
  filteredVilles: Feature[] = [];
  selectedAdress!: Feature;
  suggestionsVisible = false;
  keepSuggestionsVisible = false;
  currentStep = 1;

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

  buisnessForm = this.formBuilder.group({
    name: ['', Validators.required],
    siren: ['', [Validators.required, Valid.sirenValidator()]],
  });

  establishmentForm = this.formBuilder.group({
    name: ['', Validators.required],
    siret: ['', [Validators.required, Valid.siretValidator()]],
    email: ['', [Validators.required, Valid.emailValidator()]],
    phoneNumber: ['', Validators.required],
  });

  addressForm = this.formBuilder.group({
    streetNumber: ['', Validators.required],
    streetName: ['', Validators.required],
    zipCode: ['', Validators.required],
    city: ['', Validators.required],
    latitude: [0, Validators.required],
    longitude: [0, Validators.required],
  });

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
      streetName: ville.properties.name,
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

        this.buisnessService.createBuisness(buisness).subscribe({
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
