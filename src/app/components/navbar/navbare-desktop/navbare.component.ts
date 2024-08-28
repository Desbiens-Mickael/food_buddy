import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Link } from '../../../shared/models/Link.model';
import {
  eligibleRoutes,
  publicRoutes,
  userRoutes,
} from '../../../shared/routes-config/routes';
import { LinkNavbarComponent } from '../../ui/link-navbar/link-navbar.component';
import { LogoutButtonComponent } from '../../ui/logout-button/logout-button.component';

@Component({
  selector: 'app-navbare-desktop',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LinkNavbarComponent,
    LogoutButtonComponent,
  ],
  templateUrl: './navbare.component.html',
  styleUrl: './navbare.component.css',
})
export class NavbareDesktopComponent implements OnInit, OnChanges {
  publicRoutes: Link[] = publicRoutes;
  userRoutes!: Link[];

  @Input()
  isLogged = false;

  @Input()
  isEligible = false;

  ngOnInit(): void {
    this.userRoutes = this.isEligible
      ? userRoutes.concat(eligibleRoutes)
      : userRoutes;
  }

  ngOnChanges(): void {
    this.userRoutes = this.isEligible
      ? userRoutes.concat(eligibleRoutes)
      : userRoutes;
  }
}
