import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BackButtonComponent } from '../../../../components/ui/back-button/back-button.component';

@Component({
  selector: 'app-security-settings-page',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  templateUrl: './security-settings-page.component.html',
  styleUrl: './security-settings-page.component.css',
})
export class SecuritySettingsPageComponent {}
