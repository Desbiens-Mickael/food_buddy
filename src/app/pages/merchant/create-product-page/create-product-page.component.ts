import { Component } from '@angular/core';
import { ProductFormComponent } from '../../../components/product/product-form/product-form.component';

@Component({
  selector: 'app-create-product-page',
  standalone: true,
  imports: [ProductFormComponent],
  templateUrl: './create-product-page.component.html',
  styleUrl: './create-product-page.component.css',
})
export class CreateProductPageComponent {
  test = 'test';
}
