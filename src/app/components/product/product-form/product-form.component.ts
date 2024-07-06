import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { Product } from '../../../shared/models/Product';
import { ProductService } from '../../../shared/services/product.service';

interface DropdownList {
  id: number;
  name: string;
}

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [NgMultiSelectDropDownModule, ReactiveFormsModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent implements OnInit, AfterViewInit {
  productForm!: FormGroup;
  dropdownList: DropdownList[] = [];
  dropdownSettings = {};

  private fb = inject(FormBuilder);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private productService = inject(ProductService);

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      status: ['', Validators.required],
      alergen: [[], Validators.required],
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Sélectionner tout',
      unSelectAllText: 'Désélectionner tout',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  ngAfterViewInit() {
    this.dropdownList = [
      { id: 1, name: 'Gluten' },
      { id: 2, name: 'Soja' },
      { id: 3, name: 'Lait' },
      { id: 4, name: 'Glutenff' },
      { id: 5, name: 'Sojaff' },
      { id: 6, name: 'Laitff' },
    ];
    this.cdr.detectChanges();
  }

  submit() {
    if (this.productForm.valid) {
      this.productService
        .createProduct(this.productForm.value as Product)
        .subscribe(product => {
          console.log(product);
        });
    }
    console.log(this.productForm.value);
  }
}
