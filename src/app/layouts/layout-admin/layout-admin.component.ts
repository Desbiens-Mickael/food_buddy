import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout-admin',
  standalone: true,
  imports: [RouterOutlet, SideBarComponent, CommonModule],
  templateUrl: './layout-admin.component.html',
  styleUrls: ['./layout-admin.component.css'],
})
export class LayoutAdminComponent {
  private test = 'test';
}
