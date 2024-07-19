import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FullProduct } from '../../../shared/models/Product';
import { User } from '../../../shared/models/User';
import { ReservationService } from '../../../shared/services/reservation.service';

@Component({
  selector: 'app-product-card-user',
  standalone: true,
  imports: [],
  templateUrl: './product-card-user.component.html',
  styleUrl: './product-card-user.component.css',
})
export class ProductCardUserComponent implements OnInit {
  @Input() product!: FullProduct;
  userInfos!: User;

  private reservationService = inject(ReservationService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.userInfos = JSON.parse(localStorage.getItem('userInfo') ?? '') as User;
  }

  sendProduct(id: string) {
    this.reservationService.createReservation(id).subscribe({
      next: () => {
        this.toastr.success('Produit réservé avec succès');
      },
      error: (e: HttpErrorResponse) => {
        this.toastr.error(e.error.error_message as string);
      },
    });
  }
}
