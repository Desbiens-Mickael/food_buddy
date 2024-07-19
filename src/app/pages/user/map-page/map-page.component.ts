import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import L, {
  Icon,
  Map,
  MapOptions,
  Marker,
  icon,
  latLng,
  marker,
  tileLayer,
} from 'leaflet';
import 'leaflet-routing-machine';
import { Subscription } from 'rxjs';
import { MapItemComponent } from '../../../components/map/map-item/map-item.component';
import { SearchBarComponent } from '../../../components/map/search-bar/search-bar.component';
import { EstablishmentAdress } from '../../../shared/models/EstablishmentAdress';
import { EstablishmentAddressService } from '../../../shared/services/establishment-address.service';

interface Route {
  coordinates: L.LatLng[];
  // Ajoutez d'autres propriétés pertinentes ici si nécessaire
}

interface RoutesFoundEvent {
  routes: Route[];
  // Ajoutez d'autres propriétés pertinentes ici si nécessaire
}

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [LeafletModule, CommonModule, MapItemComponent, SearchBarComponent],
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.css',
})
export class MapPageComponent implements OnInit, OnDestroy {
  private userMarker!: Marker;
  private userIcon!: Icon;
  private merchantIcon!: Icon;
  private map!: Map;
  private routingControl: L.Routing.Control | null = null;
  public options!: MapOptions;
  public establishmentAddresses: EstablishmentAdress[] = [];
  public searchEstablishmentAddresses: EstablishmentAdress[] = [];
  public markers: Marker[] = [];
  public isLoading = true;
  public isLoadingAddresses = false;

  private establishmentAddressService = inject(EstablishmentAddressService);
  private subscription: Subscription = new Subscription();

  ngOnInit() {
    // options de la carte
    this.options = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '© OpenStreetMap contributors',
        }),
      ],
      zoom: 16,
      center: latLng(50.528256, 2.9523968),
    };

    // icone utilisateur
    this.userIcon = icon({
      ...Icon.Default.prototype.options,
      iconUrl: 'assets/marker-icon.png',
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      shadowUrl: 'assets/marker-shadow.png',
    });

    // icone commerçant
    this.merchantIcon = icon({
      ...Icon.Default.prototype.options,
      iconSize: [35, 50],
      iconAnchor: [17, 50],
      popupAnchor: [1, -34],
      iconUrl: 'assets/marker-merchant.png',
      iconRetinaUrl: 'assets/marker-merchant.png',
      shadowUrl: 'assets/marker-shadow.png',
    });

    // Recherche des adresses
    this.establishmentAddressService.findAllAddresses().subscribe(addresses => {
      this.establishmentAddresses = addresses ?? [];
      this.isLoading = false;
    });
  }

  onSearch(searchValue: string | undefined) {
    this.isLoadingAddresses = true;
    this.establishmentAddressService
      .findAllAddresses(searchValue)
      .subscribe(addresses => {
        this.establishmentAddresses = addresses ?? [];
        this.isLoadingAddresses = false;
      });
  }

  ngOnDestroy() {
    // Annuler les abonnements
    this.subscription.unsubscribe();

    // Supprimer le contrôle de routage s'il existe
    if (this.routingControl) {
      this.map.removeControl(this.routingControl);
      this.routingControl = null;
    }

    // Supprimer tous les marqueurs de la carte
    this.markers.forEach(marker => {
      this.map.removeLayer(marker);
    });
    this.markers = [];

    // Autres nettoyages éventuels

    this.map.off();
    // this.map.remove();
  }

  // initialisation de la carte quand la page est chargée
  onMapReady(map: Map) {
    this.map = map;
    // recuperation de la position de l'utilisateur
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
        this.map.setView(latLng(coords.latitude, coords.longitude), 16);
      },
      error => {
        console.error('Geolocation error: ', error);
      },
      { enableHighAccuracy: true },
    );

    // Ajout des marqueur commerçant avec une popup
    this.addMerchantMarkersInMap();
  }

  // Ajout des marqueur commerçant avec une popup
  addMerchantMarkersInMap() {
    if (this.establishmentAddresses.length > 0) {
      this.establishmentAddresses.forEach(address => {
        const logo = address.business.logo
          ? address.business.logo
          : 'assets/default-busines.png';

        const marker = L.marker(
          latLng(address.address.latitude, address.address.longitude),
          {
            title: address.establishment.name,
            icon: this.merchantIcon,
          },
        )
          .bindPopup(
            `<div>
            <img src="${logo}" alt="map-marker" />
            <a href="/establishments/${String(address.establishment.id)}" class="mt-4">Voir les produits</a>
          </div>`,
          )
          .addTo(this.map);

        this.markers.push(marker);
      });
    }
  }

  // pour ce déplcer sur l'emplacement de l'utilisateur
  targetPosition() {
    const coords = this.userMarker.getLatLng();

    this.map.flyTo(coords, 13, {
      animate: true,
      duration: 1.5,
    });

    this.map.flyTo(coords, 18, {
      animate: true,
      duration: 1.5,
    });
  }

  //pour tracer le chemin de la route à partir de l'utilisateur jusqu'à la destination
  onTraceBusiness(event: { lat: number; lng: number }) {
    // Si un controle de routage existe, on le supprime
    if (this.routingControl) {
      this.map.removeControl(this.routingControl);
    }
    const destination = latLng(event.lat, event.lng);

    // Ajouter le contrôle de routage
    this.routingControl = L.Routing.control({
      // Désactive les marqueurs de l'itinéraire puisque nous avons notre propre marqueur
      plan: L.Routing.plan([this.userMarker.getLatLng(), destination], {
        createMarker: () => {
          return false;
        },
        addWaypoints: false,
      }),
      waypoints: [this.userMarker.getLatLng(), destination],
      waypointMode: 'snap',
      routeWhileDragging: false,
      show: false,
      // style du tracé
      lineOptions: {
        styles: [{ color: 'blue', opacity: 0.6, weight: 4 }],
        addWaypoints: true,
        extendToWaypoints: true,
        missingRouteTolerance: 10,
      },
    })
      .on('routesfound', (e: RoutesFoundEvent) => {
        const route = e.routes[0];
        const bounds = L.latLngBounds(route.coordinates);

        // Appliquer l'effet de zoom arrière pour inclure tout l'itinéraire
        this.map.flyToBounds(bounds, {
          padding: [50, 50], // Ajustez le padding selon vos besoins
          duration: 1.5, // Durée de l'animation en secondes
        });

        // Rechercher et ouvrir le popup du marqueur de destination après la fin du routage
        this.map.eachLayer(layer => {
          if (layer instanceof L.Marker) {
            const markerLatLng = layer.getLatLng();
            if (markerLatLng.equals(destination)) {
              layer.openPopup();
            }
          }
        });
      })
      .addTo(this.map);
  }
}
