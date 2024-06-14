import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbareComponent } from '../../components/navbare/navbare.component';

@Component({
  selector: 'app-layout-base',
  standalone: true,
  imports: [RouterOutlet, NavbareComponent],
  templateUrl: './layout-base.component.html',
  styleUrl: './layout-base.component.css',
})
export class LayoutBaseComponent {
  test = 'test';
}
