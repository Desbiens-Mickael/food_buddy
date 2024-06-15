import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MobileNavbareComponent } from '../../components/mobile-navbare/mobile-navbare.component';
import { NavbareComponent } from '../../components/navbare/navbare.component';

@Component({
  selector: 'app-layout-base',
  standalone: true,
  imports: [RouterOutlet, NavbareComponent, MobileNavbareComponent],
  templateUrl: './layout-base.component.html',
  styleUrl: './layout-base.component.css',
})
export class LayoutBaseComponent {
  test = 'test';
}
