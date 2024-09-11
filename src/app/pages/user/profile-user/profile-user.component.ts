import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { UploadFileComponent } from '../../../components/upload-file/upload-file.component';
import { UserFormComponent } from '../../../components/user-form/user-form.component';
import { UpdateUser } from '../../../shared/models/User';
import { AuthService } from '../../../shared/services/auth.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-profile-user',
  standalone: true,
  imports: [CommonModule, UserFormComponent, UploadFileComponent],
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.css',
})
export class ProfileUserComponent implements OnInit {
  user!: UpdateUser;
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

      this.avatarUrl =
        this.user.profileImageUrl &&
        `${this.baseUrl}/users/avatar/${this.user.profileImageUrl}`;
    });
  }
}
