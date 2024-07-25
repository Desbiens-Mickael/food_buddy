import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserInfo } from '../../../shared/models/User-info.model';
import { AuthService } from '../../../shared/services/auth.service';
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
  userInfos!: UserInfo | null;
  @Input() productId!: string;
  @Input() establishmentId!: string;
  isLoading = false;

  private authService = inject(AuthService);
  private reservationService = inject(ReservationService);
  private productServise = inject(ProductService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.isLoading = true;
    this.authService.userInfo$.subscribe(userInfo => {
      this.userInfos = userInfo;
      this.isLoading = false;
    });
  }

  handleReservation() {
    this.isLoading = true;
    this.reservationService.createReservation(this.productId).subscribe({
      next: () => {
        this.isLoading = false;
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
