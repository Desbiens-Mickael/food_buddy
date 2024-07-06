import { Component, OnInit, inject } from '@angular/core';
import { EstablishmentService } from '../../../../shared/services/establishment.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../shared/models/Product';

@Component({
  selector: 'app-establishment-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './establishment-products.component.html',
  styleUrl: './establishment-products.component.css',
})
export class EstablishmentProductsComponent implements OnInit {
  private establishmentService = inject(EstablishmentService);
  private router = inject(ActivatedRoute);
  id!: string;
  products!: Product[];

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id') ?? '';

    this.establishmentService
      .getProductsByEstablishmentId(this.id)
      .subscribe(data => (this.products = data));
    console.log(this.products);
  }
}
