import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Business } from '../../../shared/models/Buisness';
import { BuisnessService } from '../../../shared/services/buisness.service';
import * as Valid from '../../../shared/validator/validator';

@Component({
  selector: 'app-buisness-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, ToastrModule],
  templateUrl: './buisness-form.component.html',
  styleUrls: ['./buisness-form.component.css'],
})
export class BuisnessFormComponent implements OnInit {
  businessForm!: FormGroup;

  @Input() parentForm?: FormGroup;
  @Input() businessName?: string;

  private formBuilder = inject(FormBuilder);
  private businessService = inject(BuisnessService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  formInit() {
    this.businessForm = this.formBuilder.group({
      name: [this.businessName ?? '', [Validators.required]],
    });

    if (!this.businessName) {
      this.businessForm.addControl(
        'siren',
        this.formBuilder.control('', [
          Validators.required,
          Valid.sirenValidator(),
        ]),
      );
    }
  }

  ngOnInit(): void {
    this.formInit();

    if (this.parentForm) {
      this.parentForm.addControl('business', this.businessForm);
    }
  }

  createBuisness(): void {
    if (this.businessForm.valid) {
      const business: Business = {
        name: this.businessForm.get('name')?.value ?? '',
        siren: this.businessForm.get('siren')?.value ?? '',
      };

      this.businessService.updateBuisness(business).subscribe({
        next: () => {
          this.toastr.success('Entreprise mise à jour avec succès');
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.error as string);
        },
      });
    }
  }
}
