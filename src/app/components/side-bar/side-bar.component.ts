import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { LogoutButtonComponent } from '../ui/logout-button/logout-button.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, LogoutButtonComponent],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {
  toggle = false;

  toggleSidebar(): void {
    this.toggle = !this.toggle;
  }
}
