import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { UserInfo } from '../../../shared/models/User-info.model';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-participate-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './participate-button.component.html',
  styleUrl: './participate-button.component.css',
})
export class ParticipateButtonComponent implements OnInit {
  userInfos!: UserInfo;
  @Input() productId!: string;

  private authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.userInfo$.subscribe(userInfo => {
      this.userInfos = {
        firstname: userInfo?.firstname ?? '',
        lastname: userInfo?.lastname ?? '',
        email: userInfo?.email ?? '',
        profileImageUrl: userInfo?.profileImageUrl ?? '',
        role: userInfo?.role ?? '',
      };
    });
    // this.userInfos = JSON.parse(localStorage.getItem('userInfo') ?? '') as User;
  }

  handleParticipate() {
    console.log('participate', this.productId);
  }
}
