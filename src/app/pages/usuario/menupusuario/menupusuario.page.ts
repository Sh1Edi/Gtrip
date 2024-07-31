import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { Usuario } from 'src/app/services/class/usuario/usuario';
import { NavController } from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
// Define la interfaz Viaje aquí
interface Viaje {
  descripcion: string;
  sede: any;
  comuna: any;
  valor: number;
  asientos: number;
  idrecorrido: number;
  rutusuario: any;
  conductor: Usuario;
  tomado: boolean;
  hora: any;
}
const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;


@Component({
  selector: 'app-menupusuario',
  templateUrl: './menupusuario.page.html',
  styleUrls: ['./menupusuario.page.scss'],
  

})
export class MenupusuarioPage implements OnInit {
  weatherTemp:any
  todayDate = new Date()
  cityName: any
  weatherIcon: any
  weatherDetails:any
  
  usuario: Usuario | null = null;
  idusuario: any = "";
  descripcion: string = '';
  eleccionSede: any = '';
  eleccionComuna: any = '';
  arregloSedes: any = [
    {
      idsede: '',
      nombresede: ''
    }
  ]

  arregloComunas: any = [
    {
      idcomuna: '',
      nombrecomuna: ''
    }
  ]
  disabledButton1: boolean = false;
  disabledButton2: boolean = true;
  arregloRecorridos: any[] = [];
  cordenadas: any = '';
  Viajes: Promise<Viaje[]> = Promise.resolve([]);
  rol: any = '';
  idS: any = '';
  constructor(public httpClient:HttpClient, private route: ActivatedRoute, private router: Router, private bd: BdserviceService, private alertController: AlertController, private navCtrl: NavController) {
    this.route.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras.state) {
        // Obtiene el ID de usuario si es necesario
        this.idusuario = navigation.extras.state['idusuarioEnviado'];
        localStorage.setItem('id', this.idusuario);
      }
    });
  }
 
 
  ngOnInit() {
    this.idS = localStorage.getItem('idr');
    const idUsuario = localStorage.getItem('id');
    if (idUsuario) {
      this.bd.datosUsuario(Number(idUsuario)).then((usuario) => {
        if (usuario) {
          this.usuario = usuario;
          this.rol = usuario.idtablarol;
        } else {
          this.presentAlert('Inicie sesión.' + idUsuario);
          this.router.navigate(['/login']);
        }
      });
    } else {
      // Manejar el caso en el que idUsuario es nulo
    }

    this.bd.dbState().subscribe((res) => {
      if (res) {
        this.bd.fetchSede().subscribe((sedes) => {
          this.arregloSedes = sedes;
        });

        this.bd.fetchComuna().subscribe((comunas) => {
          this.arregloComunas = comunas;
        });

        this.bd.fetchRecorrido().subscribe((recorridos) => {
          this.arregloRecorridos = recorridos;
          this.Viajes = this.construirViajes(this.arregloRecorridos);
        });
      }
    });

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
  
    ///${this.weatherDetails.icon}@2x.png
  }
  async construirViajes(recorridos: any[]) {
    const viajes: Viaje[] = [];
    for (const recorrido of recorridos) {
      const sede = this.arregloSedes.find((sede: any) => sede.idsede === recorrido.idtsede);
      const comuna = this.arregloComunas.find((comuna: any) => comuna.idcomuna === recorrido.idtcomuna);
  
      // Verifica si se ha seleccionado una sede y una comuna
      const sedeSeleccionada = this.eleccionSede ? this.eleccionSede.idsede : null;
      const comunaSeleccionada = this.eleccionComuna ? this.eleccionComuna.idcomuna : null;
  
      if (
        (!sedeSeleccionada || recorrido.idtsede === sedeSeleccionada) &&
        (!comunaSeleccionada || recorrido.idtcomuna === comunaSeleccionada)
      ) {
        try {
          // Obtener el usuario correspondiente al rut del conductor
          const usuario = await this.bd.obtenerUsuarioPorRut(recorrido.rutusuario);
  
          if (usuario) {
            const viaje: Viaje = {
              idrecorrido: recorrido.idrecorrido,
              descripcion: recorrido.descripcionr,
              sede: sede,
              comuna: comuna,
              valor: recorrido.valor,
              asientos: recorrido.asientos,
              rutusuario: recorrido.rutusuario,
              conductor: usuario,
              tomado: false, // Inicializar como no tomado
              hora: recorrido.hora
            };
  
            viajes.push(viaje);
          }
        } catch (error) {
          console.error('Error al obtener el usuario por rut:', error);
        }
      }
    }
    return viajes;
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  irPerfil() {
    this.router.navigate(['/perfilusuario']);
  }

  irMenu() {
    this.router.navigate(['/menupusuario']);
  }
  ubicacion() {
    this.router.navigate(['/map']);
  }

  viaje() {
    this.router.navigate(['/viaje']);
  }

  irAjustes() {
    this.router.navigate(['/ajustes']);
  }

  filtrarViajes() {
    this.Viajes = this.construirViajes(this.arregloRecorridos);
    
  }
// Función para tomar un viaje
async tomarViaje(viaje: Viaje) {
  if (viaje.asientos > 0 && !viaje.tomado) {
    const idRecorrido = viaje.idrecorrido;
    const descripcion = viaje.descripcion;
    await this.bd.CrearDetalle(descripcion, this.usuario?.idusuario, idRecorrido, this.usuario?.nombreusuario, this.usuario?.apellidousuario);

      viaje.asientos -= 1; // Incrementa los asientos del recorrido actual
      await this.bd.tomarViaje(idRecorrido)
      viaje.tomado = true;
      this.disabledButton1 = true; // Botón se desactiva
      this.disabledButton2 = false; // Botón se activa
      this.presentAlert('Viaje tomado exitosamente');
  }else{
    this.presentAlert('Error al tomar viaje');
  }
}
async cancelarViaje(viaje: Viaje) {
  const idRecorrido = viaje.idrecorrido;
  const descripcion = viaje.descripcion;
      this.disabledButton1 = false; // Botón se desactiva
      this.disabledButton2 = true; // Botón se activa;
      
      viaje.asientos += 1; // Incrementa los asientos del recorrido actual
      await this.bd.cancelarViaje(idRecorrido)
      
      
      
      viaje.tomado = false;
      this.presentAlert('Viaje cancelado');
}



}
