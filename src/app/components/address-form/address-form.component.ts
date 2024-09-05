import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
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
import { Address } from '../../shared/models/Buisness';
import { AdresseService } from '../../shared/services/adresse.service';
import { EstablishmentAddressService } from '../../shared/services/establishment-address.service';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, ToastrModule],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.css',
})
export class AddressFormComponent implements OnInit {
  addressForm!: FormGroup;
  villes!: AdresseJson;
  filteredVilles: Feature[] = [];
  selectedAdress!: Feature;
  suggestionsVisible = false;
  keepSuggestionsVisible = false;

  @Input() parentForm?: FormGroup;

  private formBuilder = inject(FormBuilder);
  private establishmentAddressService = inject(EstablishmentAddressService);
  private adresseService = inject(AdresseService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  formInit() {
    this.addressForm = this.formBuilder.group({
      streetNumber: ['', Validators.required],
      streetName: ['', Validators.required],
      zipCode: ['', Validators.required],
      city: ['', Validators.required],
      latitude: [0, Validators.required],
      longitude: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.formInit();

    if (this.parentForm) {
      this.parentForm.addControl('address', this.addressForm);
    }
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

  updateAddress(): void {
    // updateAddress(establishmentId: number): void {
    if (this.addressForm.valid) {
      const address: Address = {
        streetNumber: this.addressForm.get('streetNumber')?.value,
        streetName: this.addressForm.get('streetName')?.value,
        zipCode: this.addressForm.get('zipCode')?.value,
        city: this.addressForm.get('city')?.value,
        latitude: this.addressForm.get('latitude')?.value,
        longitude: this.addressForm.get('longitude')?.value,
      };
      console.log(address);

      // TODO: Create service to update address

      // this.establishmentAddressService
      //   .updateAddress(establishmentId, address)
      //   .subscribe({
      //     next: () => {
      //       this.addressForm.reset();
      //       void this.router.navigate(['/merchant/profile']);
      //       this.toastr.success('Établissement créé avec succès');
      //     },
      //     error: (error: HttpErrorResponse) => {
      //       this.toastr.error(error.error as string);
      //     },
      //   });
    }
  }
}
