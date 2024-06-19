import { Component } from '@angular/core';
import { LinkNavbarComponent } from '../ui/link-navbar/link-navbar.component';

@Component({
  selector: 'app-mobile-navbare',
  standalone: true,
  imports: [LinkNavbarComponent],
  templateUrl: './mobile-navbare.component.html',
  styleUrl: './mobile-navbare.component.css',
})
export class MobileNavbareComponent {
  test = 'test';
}
