import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CardReservationComponent } from '../../../components/card-reservation/card-reservation.component';
import { Reservation } from '../../../shared/models/Reservation';
import { ReservationService } from '../../../shared/services/reservation.service';

@Component({
  selector: 'app-reservations-user',
  standalone: true,
  imports: [CardReservationComponent, CommonModule],
  templateUrl: './reservations-user.component.html',
  styleUrl: './reservations-user.component.css',
})
export class ReservationsUserComponent implements OnInit {
  reservations: Reservation[] = [];

  private reservationService = inject(ReservationService);

  ngOnInit(): void {
    this.reservationService.getAllReservationsByUser().subscribe(data => {
      this.reservations = data;
      console.log(this.reservations);
    });
  }
}
