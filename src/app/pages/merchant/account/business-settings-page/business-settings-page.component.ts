import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../../environments/environment';
import { BuisnessFormComponent } from '../../../../components/buisness-form/buisness-form.component';
import { LoaderComponent } from '../../../../components/loader/loader.component';
import { UploadFileComponent } from '../../../../components/upload-file/upload-file.component';
import { Business } from '../../../../shared/models/Buisness';
import { BuisnessService } from '../../../../shared/services/buisness.service';

@Component({
  selector: 'app-business-settings-page',
  standalone: true,
  imports: [
    CommonModule,
    BuisnessFormComponent,
    UploadFileComponent,
    LoaderComponent,
  ],
  templateUrl: './business-settings-page.component.html',
  styleUrl: './business-settings-page.component.css',
})
export class BusinessSettingsPageComponent implements OnInit {
  baseLogoUrl = environment.apiUrl + '/businesses/logo/';
  businessInfos!: Business | null;
  isLoading = true;

  private businessService = inject(BuisnessService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.businessService.businessInfo$.subscribe(data => {
      this.businessInfos = data;
      this.isLoading = false;
    });
  }

  onUploadFile(files: File[]) {
    this.businessService.uploadBusinessLogo(files[0]).subscribe({
      next: () => {
        this.toastr.success('Logo modifié avec succès');
      },
      error: () => {
        this.toastr.error('Erreur lors de la modification du logo');
      },
    });
  }
}
