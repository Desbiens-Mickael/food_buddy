import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-participate-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './participate-button.component.html',
  styleUrl: './participate-button.component.css',
})
export class ParticipateButtonComponent implements OnInit {
  userInfos!: User;
  @Input() productId!: string;

  ngOnInit(): void {
    this.userInfos = JSON.parse(localStorage.getItem('userInfo') ?? '') as User;
  }

  handleParticipate() {
    console.log('participate', this.productId);
  }
}
