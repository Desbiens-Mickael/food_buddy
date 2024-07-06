import { CommonModule } from '@angular/common';
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
import { ActivatedRoute } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { Allergen } from '../../../shared/models/Allergen';
import { CreateProduct } from '../../../shared/models/Product';
import { AllergenService } from '../../../shared/services/allergen.service';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    NgMultiSelectDropDownModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent implements OnInit, AfterViewInit {
  productForm!: FormGroup;
  dropdownList: Allergen[] = [];
  dropdownSettings = {};
  establishmentId!: string;
  isLoading = true;

  private fb = inject(FormBuilder);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private router = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private allergenService = inject(AllergenService);

  ngOnInit() {
    this.establishmentId = this.router.snapshot.paramMap.get('id') ?? '';

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      type: ['drink', Validators.required],
      status: ['indisponible', Validators.required],
      allergens: [[]],
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
    // Récupération de la liste des allergènes
    this.allergenService.getAllAllergens().subscribe(allergens => {
      this.dropdownList = allergens.map(allergen => {
        return {
          id: allergen.id,
          name: allergen.name,
        };
      });
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  get getName() {
    return this.productForm.get('name');
  }

  get getDescription() {
    return this.productForm.get('description');
  }

  get getPrice() {
    return this.productForm.get('price');
  }

  get getType() {
    return this.productForm.get('type');
  }

  get getStatus() {
    return this.productForm.get('status');
  }

  get getAllergens(): Allergen[] {
    return this.productForm.value.allergens;
  }

  submit() {
    if (this.productForm.valid) {
      const allergenIdsArray = this.getAllergens.map(a => a.id);

      const newProduct = {
        name: this.productForm.value.name as string,
        description: this.productForm.value.description as string,
        price: this.productForm.value.price as number,
        type: this.productForm.value.type as string,
        status: this.productForm.value.status as string,
        allergensIds: allergenIdsArray,
        establishmentId: Number(this.establishmentId),
      } as CreateProduct;

      this.productService.createProduct(newProduct).subscribe({
        next: product => {
          this.productForm.reset();
          console.log(product);
        },
      });
    }
  }
}
