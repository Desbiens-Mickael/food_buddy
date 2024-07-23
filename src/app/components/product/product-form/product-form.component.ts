import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { Allergen } from '../../../shared/models/Allergen';
import { CreateProduct, FullProduct } from '../../../shared/models/Product';
import { AllergenService } from '../../../shared/services/allergen.service';
import { UploadFileComponent } from '../../upload-file/upload-file.component';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    NgMultiSelectDropDownModule,
    ReactiveFormsModule,
    FormsModule,
    UploadFileComponent,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent implements OnInit, AfterViewInit {
  @Input()
  product?: FullProduct;
  productForm!: FormGroup;
  dropdownList: Allergen[] = [];
  productimage?: File;
  dropdownSettings = {};
  isLoading = true;

  @Output()
  handleSubmit = new EventEmitter<CreateProduct>();

  private fb = inject(FormBuilder);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private allergenService = inject(AllergenService);

  ngOnInit() {
    this.productForm = this.fb.group({
      name: [this.product?.name ?? '', Validators.required],
      price: [
        this.product?.price ?? 0,
        [Validators.required, Validators.min(0)],
      ],
      description: [this.product?.description ?? '', Validators.required],
      type: [this.product?.type ?? 'DRINK', Validators.required],
      status: [this.product?.status ?? 'UNAVAILABLE', Validators.required],
      allergens: [this.product?.allergens ?? []],
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

  onFileDropped(fileList: FileList) {
    this.productimage = fileList[0];
  }

  onErrorOccurred(error: string) {
    console.log(error);
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
        ProductImage: this.productimage,
      };

      this.handleSubmit.emit(newProduct);

      this.productForm.reset();
    }
  }
}
