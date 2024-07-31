import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MapComponent } from 'src/app/components/map/map.component';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-mapz',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports:[IonicModule,MapComponent],
  
})
export class MapPage implements OnInit {

  altitud: any = '';
  longitud: any = '';
  constructor(private router: Router) { }

  ngOnInit() {
  }
  irPerfil() {
    this.router.navigate(['/perfilusuario']);
  }

  irMenu() {
    this.router.navigate(['/menupusuario']);
  }

  viaje() {
    this.router.navigate(['/viaje']);
  }

  irAjustes() {
    this.router.navigate(['/ajustes']);
  }
  
  ubicacion() {
    this.router.navigate(['/map']);
  }

}
