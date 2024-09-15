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
  @Input() esstablishmentInfo?: Establishment;
  @Input() parentForm?: FormGroup;

  private formBuilder = inject(FormBuilder);
  private businessService = inject(EstablishmentService);
  private toastr = inject(ToastrService);

  formInit() {
    this.establishmentForm = this.formBuilder.group({
      name: [this.esstablishmentInfo?.name ?? '', [Validators.required]],
      email: [
        this.esstablishmentInfo?.email ?? '',
        [Validators.required, Valid.emailValidator()],
      ],
      phoneNumber: [
        this.esstablishmentInfo?.phoneNumber ?? '',
        Validators.required,
      ],
    });

    // ajout du controle siret si les informations ne sont pas fournies
    if (!this.esstablishmentInfo) {
      this.establishmentForm.addControl(
        'siret',
        this.formBuilder.control('', [Validators.required]),
      );
    }
  }

  ngOnInit(): void {
    this.formInit();

    // Ajout du du formulaire au formulaire parent si il est fourni
    if (this.parentForm) {
      this.parentForm.addControl('establishment', this.establishmentForm);
    }
  }

  handleSubmit(): void {
    const id = String(this.esstablishmentInfo?.id);
    const establishment: Establishment = {
      name: this.establishmentForm.get('name')?.value,
      siret: this.establishmentForm.get('siret')?.value,
      email: this.establishmentForm.get('email')?.value,
      phoneNumber: this.establishmentForm.get('phoneNumber')?.value,
    };

    this.businessService.updateEstablishment(establishment, id).subscribe({
      next: () => {
        this.toastr.success('Établissement mis à jour avec succès');
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.error as string);
      },
    });
  }
}
