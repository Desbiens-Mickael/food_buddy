import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../shared/models/User';
import { ProductService } from '../../../shared/services/product.service';
import { ReservationService } from '../../../shared/services/reservation.service';

@Component({
  selector: 'app-reservation-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation-button.component.html',
  styleUrl: './reservation-button.component.css',
})
export class ReservationButtonComponent implements OnInit {
  userInfos!: User;
  @Input() productId!: string;
  @Input() establishmentId!: string;

  private reservationService = inject(ReservationService);
  private productServise = inject(ProductService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.userInfos = JSON.parse(localStorage.getItem('userInfo') ?? '') as User;
  }

  handleReservation() {
    this.reservationService.createReservation(this.productId).subscribe({
      next: () => {
        this.toastr.success('Produit réservé avec succès');
        this.productServise.getAllProductsByEstablishmentId(
          this.establishmentId,
        );
      },
      error: (e: HttpErrorResponse) => {
        this.toastr.error(e.error.error_message as string);
      },
    });
  }
}
