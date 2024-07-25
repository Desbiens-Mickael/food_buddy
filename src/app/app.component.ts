import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
    console.log('app component');
    // if (!this.authService.isAuthenticated()) {
    //   console.log('not authenticated');
    //   // TODO Faire la requête pour récupérer les infos utilisateur sur /me
    // this.authService.refreshUserInfo().subscribe();
    // }
  }
}

//  ngOnInit(): void {
//     this.authService.userInfo$.subscribe(userInfo => {
//       this.userInfos = {
//         firstname: userInfo.firstname,
//         lastname: userInfo.lastname,
//         email: userInfo.email,
//         profileImageUrl: userInfo.profileImageUrl,
//         role: userInfo.role,
//         isAuthenticated: userInfo.isAuthenticated,
//       };
//     });
