import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { Usuario } from 'src/app/services/class/usuario/usuario';
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

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  eleccionSede: any = '';
  eleccionComuna: any = '';
  iddetalle: any = "";
  calificaciond: any = "";
  idtablau: any = "";
  idtrecorrido: any = "";
  rut: any = '';
 
  valor: any = '';
  asientos: any = '';
  hora: any = '';
  arregloSedes: any = [
    {
      idsede: '',
      nombresede: ''
    }
  ]
  Viajes: Promise<Viaje[]> = Promise.resolve([]);

  arregloComunas: any = [
    {
      idcomuna: '',
      nombrecomuna: ''
    }
  ]

  arregloDetalleFiltrado : any = [
    {
      iddetalle: '',
      calificaciond:'',
      idtablau: '',
      idtrecorrido: '',
      nombreCliente: '',
      apellidoCliente: '',
    }
  ]
   arregloDetalle : any = [
    {
      iddetalle: '',
      calificaciond:'',
      idtablau: '',
      idtrecorrido: '',
      nombreCliente: '',
      apellidoCliente: '',
    }
  ] 

  arregloRecorridos: any[] = [];
  usuario: Usuario | null = null;

  idS : any = "";
  constructor(private router: Router, private bd: BdserviceService, private alertController: AlertController, private navCtrl: NavController) {
    
  }

  ngOnInit() {
    const idUsuario = localStorage.getItem('id');
    this.idS = localStorage.getItem('id');
    if (idUsuario) {
      this.bd.datosUsuario(Number(idUsuario)).then((usuario) => {
        if (usuario) {
          this.usuario = usuario;
          this.rut = usuario.rutusuario;
        } else {
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
        this.bd.fetchDetalle().subscribe((detalle) => {
          this.arregloDetalle = detalle;
        });
        this.bd.fetchDetalleFiltrado().subscribe((detalleF) => {
          this.arregloDetalleFiltrado = detalleF;
        })
        this.bd.fetchRecorrido().subscribe((recorridos) => {
          this.arregloRecorridos = recorridos;
          this.Viajes = this.construirViajes(this.arregloRecorridos);
        });
      }
      this.bd.detalleUsuario(this.idS);
    });
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


  irPerfil() {
    this.router.navigate(['/perfilusuario']);
  }

  irMenu() {
    this.router.navigate(['/menupusuario']);
  }

  ubicacion() {
    this.router.navigate(['/map']);
  }



  irAjustes() {
    this.router.navigate(['/ajustes']);
  }

  actualizarViajes() {
    // Vuelve a cargar los recorridos del usuario actual
    this.bd.fetchRecorrido().subscribe((recorridos) => {
      this.arregloRecorridos = recorridos;
      this.Viajes = this.construirViajes(this.arregloRecorridos);
    });
    this.bd.fetchDetalleFiltrado().subscribe((detalleF) => {
      this.arregloDetalleFiltrado = detalleF;

    })
    }



}
