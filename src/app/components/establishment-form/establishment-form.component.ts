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
import { Establishment } from '../../shared/models/Buisness';
import { EstablishmentService } from '../../shared/services/establishment.service';
import * as Valid from '../../shared/validator/validator';

@Component({
  selector: 'app-establishment-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, ToastrModule],
  templateUrl: './establishment-form.component.html',
  styleUrl: './establishment-form.component.css',
})
export class EstablishmentFormComponent implements OnInit {
  establishmentForm!: FormGroup;
  @Input() parentForm?: FormGroup;

  private formBuilder = inject(FormBuilder);
  private businessService = inject(EstablishmentService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  formInit() {
    this.establishmentForm = this.formBuilder.group({
      name: ['TT', Validators.required],
      siret: ['22222', [Validators.required, Valid.siretValidator()]],
      email: ['tt@t.t', [Validators.required, Valid.emailValidator()]],
      phoneNumber: ['0600000000', Validators.required],
    });
  }

  ngOnInit(): void {
    this.formInit();

    if (this.parentForm) {
      this.parentForm.addControl('establishment', this.establishmentForm);
    }
  }

  createEstablishment(): void {
    if (this.establishmentForm.valid) {
      const establishment: Establishment = {
        name: this.establishmentForm.get('name')?.value ?? '',
        siret: this.establishmentForm.get('siret')?.value ?? '',
        email: this.establishmentForm.get('email')?.value ?? '',
        phoneNumber: this.establishmentForm.get('phoneNumber')?.value ?? '',
      };

      this.businessService.createEstablishment(establishment).subscribe({
        next: () => {
          this.establishmentForm.reset();
          void this.router.navigate(['/merchant/profile']);
          this.toastr.success('Établissement créé avec succès');
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.error as string);
        },
      });
    }
  }
}
