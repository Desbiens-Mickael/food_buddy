import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Link } from '../../../shared/models/Link.model';
import { publicLinks, userLinks } from '../../../shared/routes-config/routes';
import { LinkNavbarComponent } from '../../ui/link-navbar/link-navbar.component';

@Component({
  selector: 'app-navbare-desktop',
  standalone: true,
  imports: [CommonModule, RouterModule, LinkNavbarComponent],
  templateUrl: './navbare.component.html',
  styleUrl: './navbare.component.css',
})
export class NavbareDesktopComponent {
  publicLinks: Link[] = publicLinks;
  userLinks: Link[] = userLinks;

  @Input()
  isLogged = false;
}
