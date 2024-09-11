import { Component, inject, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Business } from '../../shared/models/Buisness';
import { InfosLinkEstablishment } from '../../shared/models/Establishment';
import { UserInfo } from '../../shared/models/User-info.model';
import { AuthService } from '../../shared/services/auth.service';
import { BuisnessService } from '../../shared/services/buisness.service';
import { EstablishmentService } from '../../shared/services/establishment.service';
import { SideBareSkeletonComponent } from '../skeleton/side-bare-skeleton/side-bare-skeleton.component';
import { LogoutButtonComponent } from '../ui/logout-button/logout-button.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    CommonModule,
    LogoutButtonComponent,
    RouterModule,
    SideBareSkeletonComponent,
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent implements OnInit {
  userInfos!: UserInfo | null;
  businessInfos!: Business | null;
  establishments: InfosLinkEstablishment[] = [];
  establishmentActive!: InfosLinkEstablishment;
  toggle = false;
  isLodding = true;
  baseUrl = environment.apiUrl;

  private establismentsService = inject(EstablishmentService);
  private authService = inject(AuthService);
  private businessService = inject(BuisnessService);
  private router = inject(Router);

  ngOnInit(): void {
    this.authService.userInfo$.subscribe(userInfo => {
      this.userInfos = userInfo;
    });

    this.businessService.getBusiness().subscribe(businessInfo => {
      this.businessInfos = businessInfo;
    });

    this.establismentsService.getAllLinkEstablishments().subscribe(data => {
      this.establishments = data;
      this.establishmentActive = this.establishments[0];
      this.isLodding = false;
    });
  }

  changeEstablishment(event: Event): void {
    const id = (event.target as HTMLInputElement).value;
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
