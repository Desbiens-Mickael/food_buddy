import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  Establishment,
  EstablishmentWithAddress,
} from '../../../shared/models/Establishment';
import { Address } from '../../../shared/models/EstablishmentAdress';
import { EstablishmentAddressService } from '../../../shared/services/establishment-address.service';
import { EstablishmentService } from '../../../shared/services/establishment.service';
import { AddressFormComponent } from '../address-form/address-form.component';
import { EstablishmentFormComponent } from '../establishment-form/establishment-form.component';

@Component({
  selector: 'app-full-establishment-form',
  standalone: true,
  imports: [CommonModule, EstablishmentFormComponent, AddressFormComponent],
  templateUrl: './full-establishment-form.component.html',
  styleUrl: './full-establishment-form.component.css',
})
export class FullEstablishmentFormComponent implements OnInit {
  @Input() establishment?: Establishment;
  address!: Address;
  fullEstablishmentForm?: FormGroup;

  private formBuilder = inject(FormBuilder);
  private establishmentAddressService = inject(EstablishmentAddressService);
  private establishmentService = inject(EstablishmentService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    if (this.establishment) {
      this.establishmentAddressService
        .getAddressById(this.establishment.id ?? 0)
        .subscribe({
          next: addressData => {
            if (addressData) {
              this.address = addressData;
            }
          },
        });
    } else {
      this.fullEstablishmentForm = this.formBuilder.group({});
    }
  }

  handleSubmit(): void {
    if (this.fullEstablishmentForm?.valid) {
      const establishmentWithAddress: EstablishmentWithAddress = {
        establishment: this.fullEstablishmentForm.get('establishment')?.value,
        address: this.fullEstablishmentForm.get('address')?.value,
      };
      console.log(establishmentWithAddress);
      this.establishmentService
        .addEstablishment(establishmentWithAddress)
        .subscribe({
          next: () => {
            this.fullEstablishmentForm?.reset();
            this.toastr.success('Établissement ajouté avec succès');
          },
          error: (error: HttpErrorResponse) => {
            console.error(error);
            this.toastr.error(
              "Une erreur s'est produite lors de l'ajout de l'établissement",
            );
          },
        });
    }
  }
}
