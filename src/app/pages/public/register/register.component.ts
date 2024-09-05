import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BuisnessRegisterFormComponent } from '../../../components/buisness-register-form/buisness-register-form.component';
import { UserFormComponent } from '../../../components/user-form/user-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, UserFormComponent, BuisnessRegisterFormComponent],
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
