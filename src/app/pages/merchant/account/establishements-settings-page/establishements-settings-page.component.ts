import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AddressFormComponent } from '../../../../components/form/address-form/address-form.component';
import { EstablishmentFormComponent } from '../../../../components/form/establishment-form/establishment-form.component';
import { FullEstablishmentFormComponent } from '../../../../components/form/full-establishment-form/full-establishment-form.component';
import { BackButtonComponent } from '../../../../components/ui/back-button/back-button.component';
import { DrawerComponent } from '../../../../components/ui/drawer/drawer.component';
import { DropdownMenuComponent } from '../../../../components/ui/dropdown-menu/dropdown-menu.component';
import { Establishment } from '../../../../shared/models/Establishment';
import { EstablishmentService } from '../../../../shared/services/establishment.service';

@Component({
  selector: 'app-establishements-settings-page',
  standalone: true,
  imports: [
    CommonModule,
    EstablishmentFormComponent,
    AddressFormComponent,
    DropdownMenuComponent,
    DrawerComponent,
    FullEstablishmentFormComponent,
    BackButtonComponent,
  ],
  templateUrl: './establishements-settings-page.component.html',
  styleUrl: './establishements-settings-page.component.css',
})
export class EstablishementsSettingsPageComponent implements OnInit {
  establishments: Establishment[] = [];

  private establishmentService = inject(EstablishmentService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.establishmentService.establishments$.subscribe({
      next: data => {
        this.establishments = data;
      },
      error: error => {
        console.error(error);
        this.toastr.error(
          "Une erreur s'est produite lors de la récupération des établissements, veuillez réessayer plus tard.",
        );
      },
    });
  }

  deleteEstablishment(establishmentId: number) {
    if (
      confirm(
        'Etes-vous sûr de vouloir supprimer cet établissement ? Cette action est irréversible.',
      )
    ) {
      this.establishmentService
        .deleteEstablishment(String(establishmentId))
        .subscribe({
          next: () => {
            this.toastr.success('Établissement supprimé avec succès');
            this.establishments = this.establishments.filter(
              establishment => establishment.id !== establishmentId,
            );
          },
          error: error => {
            console.error(error);
            this.toastr.error(
              "Une erreur s'est produite lors de la suppression de l'établissement",
            );
          },
        });
    }
  }
}
