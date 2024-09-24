import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-account-settings-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './account-settings-card.component.html',
  styleUrl: './account-settings-card.component.css',
})
export class AccountSettingsCardComponent {
  @Input() iconName!: string;
  @Input() title!: string;
  @Input() link!: string;
}
