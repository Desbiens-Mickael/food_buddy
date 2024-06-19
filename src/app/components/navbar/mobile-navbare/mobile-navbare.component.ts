import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Link } from '../../../shared/models/Link.model';
import { publicLinks, userLinks } from '../../../shared/routes-config/routes';
import { LinkNavbarComponent } from '../../ui/link-navbar/link-navbar.component';

@Component({
  selector: 'app-mobile-navbare',
  standalone: true,
  imports: [CommonModule, LinkNavbarComponent],
  templateUrl: './mobile-navbare.component.html',
  styleUrl: './mobile-navbare.component.css',
})
export class MobileNavbareComponent {
  publicLinks: Link[] = publicLinks;
  userLinks: Link[] = userLinks;

  @Input()
  isLogged = true;
}
