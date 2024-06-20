import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  productForm = this.productFormBuilder.group({
    name: '',
    price: 0,
    image: '',
    allergens: [],
    description: '',
  });

  constructor(private productFormBuilder: FormBuilder) {}
}
