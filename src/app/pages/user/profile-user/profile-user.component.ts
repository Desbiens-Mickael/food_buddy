import { Component, OnInit } from '@angular/core';
import { UserFormComponent } from '../../../components/user-form/user-form.component';
import { UserInfo } from '../../../shared/models/User-info.model';
import { UpdateUser } from '../../../shared/models/User';

@Component({
  selector: 'app-profile-user',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.css',
})
export class ProfileUserComponent implements OnInit {
  user!: UpdateUser;

  ngOnInit() {
    const { firstname, lastname, email } = JSON.parse(
      localStorage.getItem('userInfo') ?? '{}',
    ) as UserInfo;

    this.user = {
      firstname,
      lastname,
      email,
    };
  }
}
