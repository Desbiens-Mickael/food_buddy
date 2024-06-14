import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbare',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbare.component.html',
  styleUrl: './navbare.component.css',
})
export class NavbareComponent {
  test = 'test';
}
