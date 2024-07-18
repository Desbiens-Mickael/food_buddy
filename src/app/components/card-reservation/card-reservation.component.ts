import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-card-reservation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-reservation.component.html',
  styleUrl: './card-reservation.component.css',
})
export class CardReservationComponent {
  isHidden = false;

  toggle() {
    this.isHidden = !this.isHidden;
  }
}
