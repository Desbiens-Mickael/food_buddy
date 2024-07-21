import { Component, inject, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../shared/services/product.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-product-button',
  standalone: true,
  imports: [],
  templateUrl: './delete-product-button.component.html',
  styleUrl: './delete-product-button.component.css',
})
export class DeleteProductButtonComponent {
  @Input() productId!: string;
  @Input() establishmentId!: string;

  private productService = inject(ProductService);
  private toaster = inject(ToastrService);

  deleteProduct() {
    this.productService
      .deleteProduct(this.productId, this.establishmentId)
      .subscribe({
        next: () => {
          this.toaster.success('Produit supprimé avec succès');
        },
        error: (err: HttpErrorResponse) => {
          this.toaster.error(err.error.error_message as string);
        },
      });
  }
}
