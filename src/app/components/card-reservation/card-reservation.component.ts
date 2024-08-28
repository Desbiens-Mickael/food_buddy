import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Reservation } from '../../shared/models/Reservation';

@Component({
  selector: 'app-card-reservation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-reservation.component.html',
  styleUrl: './card-reservation.component.css',
})
export class CardReservationComponent {
  @Input() reservation!: Reservation;
  isHidden = false;

  toggle() {
    this.isHidden = !this.isHidden;
  }
}
