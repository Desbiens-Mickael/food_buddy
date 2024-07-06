import { Component, inject, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { InfosLinkEstablishment } from '../../shared/models/Establishment';
import { EstablishmentService } from '../../shared/services/establishment.service';
import { LogoutButtonComponent } from '../ui/logout-button/logout-button.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, LogoutButtonComponent, RouterModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent implements OnInit {
  establishments: InfosLinkEstablishment[] = [];
  establishmentActive!: InfosLinkEstablishment;
  toggle = false;
  isLodding = true;

  private establismentsService = inject(EstablishmentService);
  private router = inject(Router);

  ngOnInit(): void {
    this.establismentsService.getAllLinkEstablishments().subscribe(data => {
      this.establishments = data;
      this.establishmentActive = this.establishments[0];
      this.isLodding = false;
    });
  }

  changeEstablishment(event: Event): void {
    const id = (event.target as HTMLInputElement).value;
    console.log(id);
    const establishment = this.establishments.find(e => e.id === Number(id));
    if (establishment) {
      this.establishmentActive = establishment;
      void this.router.navigate([
        '/merchant/establishment/',
        this.establishmentActive.id,
        'products',
      ]);
    }
  }

  toggleSidebar(): void {
    this.toggle = !this.toggle;
  }
}
