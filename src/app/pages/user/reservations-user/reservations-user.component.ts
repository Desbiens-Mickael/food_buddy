import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CardReservationComponent } from '../../../components/card-reservation/card-reservation.component';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { Reservation } from '../../../shared/models/Reservation';
import { ReservationService } from '../../../shared/services/reservation.service';

@Component({
  selector: 'app-reservations-user',
  standalone: true,
  imports: [CardReservationComponent, CommonModule, LoaderComponent],
  templateUrl: './reservations-user.component.html',
  styleUrl: './reservations-user.component.css',
})
export class ReservationsUserComponent implements OnInit {
  reservations: Reservation[] = [];
  isLoading = true;

  private reservationService = inject(ReservationService);

  ngOnInit(): void {
    this.reservationService.getAllReservationsByUser().subscribe(data => {
      this.reservations = data;
      this.isLoading = false;
    });
  }
}
