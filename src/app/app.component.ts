import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserInfo } from './shared/models/User-info.model';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'food_buddy';
  private authService = inject(AuthService);

  ngOnInit(): void {
    const userInfo = JSON.parse(
      localStorage.getItem('userInfo') ?? '{}',
    ) as UserInfo;

    this.authService.setUserInfo(userInfo);
  }
}
