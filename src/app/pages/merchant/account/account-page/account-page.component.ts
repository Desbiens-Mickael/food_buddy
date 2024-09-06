import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AccountSettingsCardComponent } from '../../../../components/account-settings-card/account-settings-card.component';

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [CommonModule, AccountSettingsCardComponent],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.css',
})
export class AccountPageComponent {}
