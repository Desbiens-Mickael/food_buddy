import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-link-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './link-navbar.component.html',
  styleUrl: './link-navbar.component.css',
})
export class LinkNavbarComponent {
  @Input()
  route = '';

  @Input()
  text = '';

  @Input()
  icon = '';

  @Input()
  isMobile = false;
}
