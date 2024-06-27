import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { BuisnessFormComponent } from '../../components/buisness-form/buisness-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, UserFormComponent, BuisnessFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  choiceBuisness = false;
  choiceUser = true;

  buisnessChoice(): void {
    this.choiceBuisness = true;
    this.choiceUser = false;
  }
  clientChoice(): void {
    this.choiceBuisness = false;
    this.choiceUser = true;
  }
}
