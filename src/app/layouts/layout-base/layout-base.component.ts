import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MobileNavbareComponent } from '../../components/navbar/mobile-navbare/mobile-navbare.component';
import { NavbareDesktopComponent } from '../../components/navbar/navbare-desktop/navbare.component';

@Component({
  selector: 'app-layout-base',
  standalone: true,
  imports: [RouterOutlet, NavbareDesktopComponent, MobileNavbareComponent],
  templateUrl: './layout-base.component.html',
  styleUrl: './layout-base.component.css',
})
export class LayoutBaseComponent {
  test = 'test';
}
