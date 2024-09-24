import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
})
export class DrawerComponent {
  @Input() textButton?: string;
  @Input() textButtonTitle?: string;
  @Input() icon?: string;
  @Input() iconTitle?: string;
  toggle = false;
  leaving = false;

  handleToggle() {
    if (this.toggle) {
      this.leaving = true;
      // Sert à retarder le démontage du composant pour l'animation de sortie
      setTimeout(() => {
        this.toggle = false;
        this.leaving = false;
      }, 450);
    } else {
      this.toggle = true;
    }
  }
}
