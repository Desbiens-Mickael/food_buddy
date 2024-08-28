import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-allergen-badge',
  standalone: true,
  imports: [],
  templateUrl: './allergen-badge.component.html',
  styleUrl: './allergen-badge.component.css',
})
export class AllergenBadgeComponent {
  @Input() allergenName!: string;
}
