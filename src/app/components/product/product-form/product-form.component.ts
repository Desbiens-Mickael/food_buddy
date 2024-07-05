import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;

  private fb = inject(FormBuilder);

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      description: ['', Validators.required],
    });
  }

  submit() {
    console.log('submit');
  }
}
