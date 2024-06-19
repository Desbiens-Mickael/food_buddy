import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LinkNavbarComponent } from '../ui/link-navbar/link-navbar.component';

@Component({
  selector: 'app-navbare',
  standalone: true,
  imports: [CommonModule, RouterModule, LinkNavbarComponent],
  templateUrl: './navbare.component.html',
  styleUrl: './navbare.component.css',
})
export class NavbareComponent {
  test = 'test';
}
