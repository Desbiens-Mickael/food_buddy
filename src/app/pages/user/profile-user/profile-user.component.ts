import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UserFormComponent } from '../../../components/user-form/user-form.component';
import { UpdateUser } from '../../../shared/models/User';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-profile-user',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.css',
})
export class ProfileUserComponent implements OnInit {
  user!: UpdateUser;
  baseUrl = environment.apiUrl;

  private authService = inject(AuthService);

  ngOnInit() {
    this.authService.userInfo$.subscribe(userInfo => {
      this.user = {
        firstname: userInfo?.firstname ?? '',
        lastname: userInfo?.lastname ?? '',
        email: userInfo?.email ?? '',
        profileImageUrl: userInfo?.profileImageUrl ?? '',
      };
    });
  }
}
