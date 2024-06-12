import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-admin',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout-admin.component.html',
  styleUrl: './layout-admin.component.css',
})
export class LayoutAdminComponent {
  test = 'test';
}
