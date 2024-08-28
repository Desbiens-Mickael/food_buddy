import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-map-item',
  standalone: true,
  imports: [],
  templateUrl: './map-item.component.html',
  styleUrl: './map-item.component.css',
})
export class MapItemComponent implements OnInit {
  baseUrl = environment.apiUrl;
  @Input() name!: string;
  @Input() phoneNumber!: string;
  @Input() latitude!: number;
  @Input() longitude!: number;
  @Input() streetNumber!: number;
  @Input() streetName!: string;
  @Input() zipCode!: string;
  @Input() city!: string;
  @Input() logoUrl!: string;

  fullAddress!: string;

  @Output() traceBusiness = new EventEmitter<{
    lat: number;
    lng: number;
  }>();

  ngOnInit() {
    this.fullAddress = `${String(this.streetNumber)} ${this.streetName} ${this.zipCode} ${this.city}`;
  }

  onTraceBusiness() {
    const lat = this.latitude;
    const lng = this.longitude;
    this.traceBusiness.emit({ lat, lng });
  }
}
