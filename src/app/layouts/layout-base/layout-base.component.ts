import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { MobileNavbareComponent } from '../../components/navbar/mobile-navbare/mobile-navbare.component';
import { NavbareDesktopComponent } from '../../components/navbar/navbare-desktop/navbare.component';
import { AuthService } from '../../shared/services/auth.service';
@Component({
  selector: 'app-layout-base',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbareDesktopComponent,
    MobileNavbareComponent,
    FooterComponent,
    CommonModule,
  ],
  templateUrl: './layout-base.component.html',
  styleUrl: './layout-base.component.css',
})
export class LayoutBaseComponent implements OnInit, OnChanges {
  isLogged = false;
  isEligible = false;

  private authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.userInfo$.subscribe(userInfo => {
      this.isLogged = !!userInfo?.email;
      this.isEligible = userInfo?.isEligible ?? false;
    });
  }

  ngOnChanges(): void {
    this.authService.userInfo$.subscribe(
      userInfo => (this.isLogged = !!userInfo?.email),
    );
  }
}
