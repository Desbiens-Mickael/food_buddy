import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { UserFormComponent } from '../../../components/form/user-form/user-form.component';
import { BackButtonComponent } from '../../../components/ui/back-button/back-button.component';
import { UploadFileComponent } from '../../../components/upload-file/upload-file.component';
import { UpdateUser } from '../../../shared/models/User';
import { AuthService } from '../../../shared/services/auth.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-profile-user',
  standalone: true,
  imports: [
    CommonModule,
    UserFormComponent,
    UploadFileComponent,
    BackButtonComponent,
  ],
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.css',
})
export class ProfileUserComponent implements OnInit {
  user!: UpdateUser;
  userRole: string | undefined;
  baseUrl = environment.apiUrl;
  avatarUrl!: string | undefined;

  private authService = inject(AuthService);
  private userService = inject(UserService);
  private toastr = inject(ToastrService);

  onUploadFile(files: File[]) {
    this.userService.uploadAvatar(files[0], this.user.email).subscribe({
      next: () => {
        this.toastr.success('Photo de profil modifiée avec succès');
      },
      error: () => {
        this.toastr.error('Erreur lors de la modification de la photo');
      },
    });
  }

  ngOnInit() {
    this.authService.userInfo$.subscribe(userInfo => {
      this.user = {
        firstname: userInfo?.firstname ?? '',
        lastname: userInfo?.lastname ?? '',
        email: userInfo?.email ?? '',
        profileImageUrl: userInfo?.profileImageUrl ?? '',
      };

      this.userRole = userInfo?.role ?? '';

      this.avatarUrl =
        this.user.profileImageUrl &&
        `${this.baseUrl}/users/avatar/${this.user.profileImageUrl}`;
    });
  }
}
