import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AddressFormComponent } from '../../../../components/address-form/address-form.component';
import { EstablishmentFormComponent } from '../../../../components/establishment-form/establishment-form.component';
import { Establishment } from '../../../../shared/models/Buisness';
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

  private establishmentService = inject(EstablishmentService);

  ngOnInit(): void {
    this.establishmentService.establishments$.subscribe(data => {
      this.establishments = data;
      this.selectedEstablishment = this.establishments[0];
    });
  }

  selectEstablishment(event: Event): void {
    const id = (event.target as HTMLInputElement).value;
    const establishment = this.establishments.find(e => e.id === Number(id));
    if (establishment) {
      this.selectedEstablishment = establishment;
    }
  }
}
