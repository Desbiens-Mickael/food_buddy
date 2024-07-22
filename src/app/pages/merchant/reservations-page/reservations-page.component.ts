import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReservationCardMerchantComponent } from '../../../components/reservation/reservation-card-merchant/reservation-card-merchant.component';
import { SearchBarComponent } from '../../../components/search-bar/search-bar.component';
import { Reservation } from '../../../shared/models/Reservation';
import { ReservationService } from '../../../shared/services/reservation.service';

@Component({
  selector: 'app-reservations-page',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, ReservationCardMerchantComponent],
  templateUrl: './reservations-page.component.html',
  styleUrl: './reservations-page.component.css',
})
export class ReservationsPageComponent implements OnInit {
  reservation!: Reservation | null;
  private establishmentId!: string;
  isLoading = false;

  private reservationService = inject(ReservationService);
  private router = inject(ActivatedRoute);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.establishmentId =
      this.router.snapshot.paramMap.get('establishmentId') ?? '';
  }

  onSearchReservation(code: string | undefined): void {
    if (code) {
      this.isLoading = true;
      this.reservationService.getReservationByCode(code, this.establishmentId);
      this.reservationService.reservationByCode$.subscribe(reservation => {
        this.reservation = reservation;
      });
      this.isLoading = false;
    }
  }
}
