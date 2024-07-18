import { Component } from '@angular/core';
import { CardReservationComponent } from '../../../components/card-reservation/card-reservation.component';

@Component({
  selector: 'app-reservations-user',
  standalone: true,
  imports: [CardReservationComponent],
  templateUrl: './reservations-user.component.html',
  styleUrl: './reservations-user.component.css',
})
export class ReservationsUserComponent {}
