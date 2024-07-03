import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {
  toggle = false;

  toggleSidebar(): void {
    if (!this.isMobileView()) {
      return;
    }
    this.toggle = !this.toggle;
  }

  isMobileView(): boolean {
    return window.innerWidth <= 768;
  }
}
