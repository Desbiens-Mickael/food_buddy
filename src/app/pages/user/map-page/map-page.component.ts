import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {
  Icon,
  LatLngExpression,
  Layer,
  Map,
  MapOptions,
  Marker,
  icon,
  latLng,
  marker,
  tileLayer,
} from 'leaflet';

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [LeafletModule, CommonModule],
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.css',
})
export class MapPageComponent implements OnInit {
  options!: MapOptions;
  markers: Marker[] = [];
  userMarker!: Marker;
  userIcon!: Icon;
  map!: Map;
  layers: Layer[] = [];

  ngOnInit() {
    this.options = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '© OpenStreetMap contributors',
        }),
      ],
      zoom: 18,
      center: latLng(50.528256, 2.9523968),
    };

    this.userIcon = icon({
      ...Icon.Default.prototype.options,
      iconUrl: 'assets/marker-icon.png',
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      shadowUrl: 'assets/marker-shadow.png',
    });

    // Créer un contrôle personnalisé pour le bouton de localisation
  }

  // pour ce déplcer sur l'emplacement de l'utilisateur
  targetPosition(lat?: number, lng?: number) {
    let coords: LatLngExpression;
    if (lat && lng) {
      coords = [lat, lng];
    } else {
      coords = this.userMarker.getLatLng();
    }
    this.map.flyTo(coords, 13, {
      animate: true,
      duration: 1.5,
    });

    this.map.flyTo(coords, 18, {
      animate: true,
      duration: 1.5,
    });
  }

  onMapReady(map: Map) {
    this.map = map;
    navigator.geolocation.getCurrentPosition(
      position => {
        const coords = position.coords;
        // Ajoutet l'utilisateur sur la carte
        this.userMarker = marker([coords.latitude, coords.longitude], {
          title: 'Votre position',
          icon: this.userIcon,
        });
        this.markers.push(this.userMarker);

        // setView sert à centrer la carte sur la position de l'utilisateur
        map.setView(latLng(coords.latitude, coords.longitude), 18);
      },
      error => {
        console.error('Geolocation error: ', error);
      },
      { enableHighAccuracy: true },
    );
  }
}
