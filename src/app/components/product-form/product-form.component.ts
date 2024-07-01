import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product } from '../../shared/models/Product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      image: ['', Validators.required],
      allergens: this.fb.array([]),
      description: [''],
    });
  }

  get allergens() {
    return this.productForm.get('allergens') as FormArray;
  }

  addAllergen() {
    this.allergens.push(this.fb.control(''));
  }

  removeAllergen(index: number) {
    this.allergens.removeAt(index);
  }

  onSubmit() {
    if (this.productForm.valid) {
      const newProduct: Product = this.productForm.value;
      console.log('Product created:', newProduct);
      // Envoyer les données au serveur ou faire autre chose avec le produit
    }
  }
}
