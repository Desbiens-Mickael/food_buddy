import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { filter, switchMap, tap } from 'rxjs';
import { AddressFormComponent } from '../../../../components/address-form/address-form.component';
import { EstablishmentFormComponent } from '../../../../components/establishment-form/establishment-form.component';
import { Establishment } from '../../../../shared/models/Buisness';
import { Address } from '../../../../shared/models/EstablishmentAdress';
import { EstablishmentAddressService } from '../../../../shared/services/establishment-address.service';
import { EstablishmentService } from '../../../../shared/services/establishment.service';

@Component({
  selector: 'app-establishements-settings-page',
  standalone: true,
  imports: [CommonModule, EstablishmentFormComponent, AddressFormComponent],
  templateUrl: './establishements-settings-page.component.html',
  styleUrl: './establishements-settings-page.component.css',
})
export class EstablishementsSettingsPageComponent implements OnInit {
  establishments: Establishment[] = [];
  selectedEstablishment!: Establishment;
  selectedEstablishmentAddress!: Address;

  private establishmentService = inject(EstablishmentService);
  private establishmentAddressService = inject(EstablishmentAddressService);

  ngOnInit(): void {
    this.establishmentService.establishments$
      .pipe(
        filter(data => data.length > 0),
        tap(data => {
          this.establishments = data;
          this.selectedEstablishment = data[0];
        }),
        switchMap(data =>
          this.establishmentAddressService.getAddressById(data[0].id ?? 0),
        ),
      )
      .subscribe(addressData => {
        if (addressData) {
          this.selectedEstablishmentAddress = addressData;
        }
      });
  }

  selectEstablishment(event: Event): void {
    const id = (event.target as HTMLInputElement).value;
    const establishment = this.establishments.find(e => e.id === Number(id));
    if (establishment) {
      this.selectedEstablishment = establishment;
      this.establishmentAddressService.getAddressById(Number(id)).subscribe({
        next: addressData => {
          if (addressData) {
            this.selectedEstablishmentAddress = addressData;
          }
        },
      });
    }
  }
}
