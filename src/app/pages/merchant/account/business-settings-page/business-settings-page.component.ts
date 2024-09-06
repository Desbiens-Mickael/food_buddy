import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BuisnessFormComponent } from '../../../../components/buisness-form/buisness-form.component';
import { UploadFileComponent } from '../../../../components/upload-file/upload-file.component';

@Component({
  selector: 'app-business-settings-page',
  standalone: true,
  imports: [CommonModule, BuisnessFormComponent, UploadFileComponent],
  templateUrl: './business-settings-page.component.html',
  styleUrl: './business-settings-page.component.css',
})
export class BusinessSettingsPageComponent {}
