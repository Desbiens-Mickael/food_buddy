import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Reservation } from '../../../shared/models/Reservation';
import { ReservationService } from '../../../shared/services/reservation.service';

@Component({
  selector: 'app-reservation-card-merchant',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reservation-card-merchant.component.html',
  styleUrl: './reservation-card-merchant.component.css',
})
export class ReservationCardMerchantComponent {
  @Input() reservation!: Reservation;
  code = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9]{8}$'),
  ]);
  isLoading = false;

  get codeValue(): string {
    return this.code.value ?? '';
  }

  private reservationService = inject(ReservationService);
  private toaster = inject(ToastrService);

  handleSubmitCode(): void {
    if (this.code.valid) {
      try {
        this.isLoading = true;
        this.reservationService.deleteReservation(
          this.codeValue,
          this.reservation.id,
        );
        this.toaster.success('Réservation supprimée avec succès');
        this.isLoading = false;
      } catch (error) {
        console.error('Error deleting reservation:', error);
        this.toaster.error('Une erreur est survenue');
        this.isLoading = false;
      }
    }
  }
}
