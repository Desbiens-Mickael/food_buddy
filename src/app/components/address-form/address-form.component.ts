import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Input, OnChanges, OnInit } from '@angular/core';
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
import { Address } from '../../shared/models/EstablishmentAdress';
import { AdresseService } from '../../shared/services/adresse.service';
import { EstablishmentAddressService } from '../../shared/services/establishment-address.service';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, ToastrModule],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.css',
})
export class AddressFormComponent implements OnInit, OnChanges {
  addressForm!: FormGroup;
  villes!: AdresseJson;
  filteredVilles: Feature[] = [];
  selectedAdress!: Feature;
  suggestionsVisible = false;
  keepSuggestionsVisible = false;

  @Input() parentForm?: FormGroup;
  @Input() addressInfos?: Address;

  private formBuilder = inject(FormBuilder);
  private establishmentAddressService = inject(EstablishmentAddressService);
  private adresseService = inject(AdresseService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  formInit() {
    this.addressForm = this.formBuilder.group({
      streetNumber: [
        this.addressInfos?.streetNumber ?? '',
        Validators.required,
      ],
      streetName: [this.addressInfos?.streetName ?? '', Validators.required],
      zipCode: [this.addressInfos?.zipCode ?? '', Validators.required],
      city: [this.addressInfos?.city ?? '', Validators.required],
      latitude: [this.addressInfos?.latitude ?? 0, Validators.required],
      longitude: [this.addressInfos?.longitude ?? 0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.formInit();

    if (this.parentForm) {
      this.parentForm.addControl('address', this.addressForm);
    }
  }

  ngOnChanges(): void {
    this.formInit();
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
    const establishmentId = this.addressInfos?.id;
    if (this.addressForm.valid) {
      const address: Address = {
        streetNumber: this.addressForm.get('streetNumber')?.value,
        streetName: this.addressForm.get('streetName')?.value,
        zipCode: this.addressForm.get('zipCode')?.value,
        city: this.addressForm.get('city')?.value,
        latitude: this.addressForm.get('latitude')?.value,
        longitude: this.addressForm.get('longitude')?.value,
      };

      // TODO: Create service to update address

      this.establishmentAddressService
        .updateAddress(establishmentId ?? 0, address)
        .subscribe({
          next: () => {
            this.toastr.success('Addresse mise à jour avec succès');
          },
          error: (error: HttpErrorResponse) => {
            this.toastr.error(error.error as string);
          },
        });
    }
  }
}
