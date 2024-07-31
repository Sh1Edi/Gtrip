import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';

const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;

@Component({
  selector: 'app-menupadmin',
  templateUrl: './menupadmin.page.html',
  styleUrls: ['./menupadmin.page.scss'],
})
export class MenupadminPage implements OnInit {

  constructor(public httpClient:HttpClient ,private router : Router, private bd : BdserviceService, private alertController: AlertController) { }


  weatherTemp:any
  todayDate = new Date()
  cityName: any
  weatherIcon: any
  weatherDetails:any


  ngOnInit() {
    this.loadData('Santiago', 'Chile');
  }
  loadData(city: string, country: string) {
    this.httpClient.get<any>(`${API_URL}/weather?q=${city},${country}&appid=${API_KEY}`).subscribe(results => {
      console.log(results);
      this.weatherTemp = results['main'];
      this.cityName = results['name'];
      console.log(this.weatherTemp);
      this.weatherDetails = results['weather'][0];
      console.log(this.weatherDetails);
  
      // Obtener el código del ícono del clima actual desde la respuesta de la API
      const iconCode = this.weatherDetails.icon;
  
      // Construir la URL del ícono utilizando el código proporcionado por la API
      const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
  
      // Descargar la imagen desde la URL y asignarla a la propiedad weatherIcon
      this.httpClient.get(iconUrl, { responseType: 'blob' }).subscribe(data => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.weatherIcon = reader.result as string;
        };
        reader.readAsDataURL(data);
      });
    });
  // loadData(city: string, country: string) {
  //   this.httpClient.get<any>(`${API_URL}/weather?q=${city},${country}&appid=${API_KEY}`).subscribe(results => {
  //     console.log(results);
  //     this.weatherTemp = results['main'];
  //     this.cityName = results['name'];
  //     console.log(this.weatherTemp);
  //     this.weatherDetails = results['weather'][0];
  //     console.log(this.weatherDetails);
  //     this.weatherIcon = `http://openweathermap.org/img/wn/01d.png`;
  //   });
    ///${this.weatherDetails.icon}@2x.png
  }

  //      REDIRECCIONES BOTONES
  irClientes(){
    this.router.navigate(['/clientes'])
  }
  irConductores(){
    this.router.navigate(['/conductores'])
  }

  //      REDIRECCIONES TABS
  irMenu() {
    this.router.navigate(['/menupadmin']);
  }
  bloquearEliminar(){
    this.router.navigate(['/eliminarbloquear'])
  }

  irEditar(){
    this.router.navigate(['/editarusuarios'])
  }
  irAjustes(){
    this.router.navigate(['/ajustesadmin'])
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
