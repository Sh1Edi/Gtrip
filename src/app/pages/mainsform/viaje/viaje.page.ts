import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { Usuario } from 'src/app/services/class/usuario/usuario';
import { ClientesPage } from '../../administrador/clientes/clientes.page';

interface Viaje {
  idrecorrido: number;
  descripcion: string;
  sede: any;
  comuna: any;
  valor: number;
  asientos: number;
  rutusuario: any;
  conductor: Usuario;
  tomado: boolean;
  hora: any;

}

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {
   
 maxAsientos: any ='';

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

  descripcion: string = '';
  valor: any = '';
  asientos: any = '';
  hora: any = '';
  eleccionSede: any = '';
  eleccionComuna: any = '';
  idtrecorrido: any ='';
  idusuario: any = '';
  rolid: any = '';
  rut: any = '';
  usuario: Usuario | null = null;
  idS: any='';
  Viajes: Promise<Viaje[]> = Promise.resolve([]);
  generarViajeHabilitado: boolean = true;

  constructor(private router: Router, private bd: BdserviceService, private alertController: AlertController) {
    this.idS = localStorage.getItem('idr');
    this.bd.detalleFiltradoUsuario(this.idS);
  }

  async ngOnInit() {
    this.idS = localStorage.getItem('idr');
    this.habilitarGenerarViaje(this.generarViajeHabilitado);
    this.bd.detalleFiltradoUsuario(this.idS);
    const idUsuario = localStorage.getItem('id');
    this.maxAsientos = await this.bd.getCantidadAsientos(idUsuario);
   
    if (idUsuario) {
      this.bd.datosUsuario(Number(idUsuario)).then((usuario) => {
        if (usuario) {
          this.usuario = usuario;
          this.rolid = usuario.idtablarol;
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
        this.arregloDetalle = detalle
       });
        this.bd.fetchDetalleFiltrado().subscribe((detalleF) => {
          this.arregloDetalleFiltrado = detalleF;
        })
        this.bd.fetchRecorrido().subscribe((recorridos) => {
          this.arregloRecorridos = recorridos;
          this.Viajes = this.construirViajes(this.arregloRecorridos);
        });
      }
      this.bd.detalleFiltradoUsuario(this.idS);
    });
  }

  // Resto de tu código...

  formatearHora(hora: string): string | null {
    // Expresión regular para validar el formato HH:MM
    const horaRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  
    if (horaRegex.test(hora)) {
      return hora; // La hora ya está en el formato correcto
    } else {
      // Si la hora no cumple con el formato, mostrar un mensaje de error o manejarlo según tu lógica
      console.error('Error: Formato de hora inválido');
      return null; 
    }
  }
 
  async onSubmit() {
    if (this.eleccionSede && this.eleccionComuna) {
      console.log('this.asientos:', this.asientos);
      console.log('this.maxAsientos:', this.maxAsientos);
      if (
        Number(this.asientos) > 0 && // Verifica que this.asientos sea mayor que cero
        Number(this.asientos) <= Number(this.maxAsientos)
      ) {
        try {
          if (this.usuario) {
            const sede = await this.bd.buscarSedePorNombre(this.eleccionSede.nombresede);
            const comuna = await this.bd.buscarComunaPorNombre(this.eleccionComuna.nombrecomuna);
            if (sede && comuna) {
              // Verificar y formatear la hora antes de insertarla en la base de datos
              const horaFormateada = this.formatearHora(this.hora);
  
              if (horaFormateada) {
                await this.bd.crearViaje(this.descripcion, sede.idsede, comuna.idcomuna, this.valor, this.asientos, this.usuario.rutusuario, horaFormateada);
                this.habilitarGenerarViaje(false); // Deshabilitar el botón
                
              } else {
                this.presentAlert('Error', 'El formato de hora es incorrecto. Utiliza "HH:MM" (horas y minutos).');
              }
            } else {
              this.presentAlert('Error', 'La sede o la comuna seleccionada no existe.');
            }
          } else {
            this.presentAlert('Error', 'No se ha encontrado información del usuario.');
          }
        } catch (error) {
          this.presentAlert('Error', 'Hubo un problema al registrar el viaje. ' + error);
        }
      } else {
        this.presentAlert('Error', 'El número de asientos no puede ser menor a 1 o mayor a ' + this.maxAsientos);
      }
    } else {
      this.presentAlert('Error', 'Ingresa una sede o comuna.');
    }
    
  }
 


// Resto de tu código...


  eliminarRecorrido(idDelRecorridoAEliminar: number) {
      localStorage.clear();
    this.bd.eliminarRecorrido(idDelRecorridoAEliminar).then(() => {
        this.habilitarGenerarViaje(true); // Habilitar el botón nuevamente
        this.presentAlert('Exito!', 'El viaje ha finalizado');
      })
      .catch((error) => {
        // Manejar errores en caso de fallo en la eliminación
      });
  }

  habilitarGenerarViaje(habilitado: boolean) {
    this.generarViajeHabilitado = habilitado;
  }

  async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
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

  irAjustes() {
    this.router.navigate(['/ajustes']);
  }
   ubicacion() {
    this.router.navigate(['/map']);
  }


  async construirViajes(recorridos: any[]): Promise<Viaje[]> {
    const viajes: Viaje[] = [];
    for (const recorrido of recorridos) {
      if (recorrido.rutusuario === this.rut) {
        const sede = this.arregloSedes.find((sede: any) => sede.idsede === recorrido.idtsede);
        const comuna = this.arregloComunas.find((comuna: any) => comuna.idcomuna === recorrido.idtcomuna);

        const sedeSeleccionada = this.eleccionSede ? this.eleccionSede.idsede : null;
        const comunaSeleccionada = this.eleccionComuna ? this.eleccionComuna.idcomuna : null;

        if (
          (!sedeSeleccionada || recorrido.idtsede === sedeSeleccionada) &&
          (!comunaSeleccionada || recorrido.idtcomuna === comunaSeleccionada)
        ) {
          try {
            const usuario = await this.bd.obtenerUsuarioPorRut(recorrido.rutusuario);

            if (usuario) {
              this.idtrecorrido = recorrido.idrecorrido;
              const viaje: Viaje = {
                idrecorrido: recorrido.idrecorrido,
                descripcion: recorrido.descripcionr,
                sede: sede,
                comuna: comuna,
                valor: recorrido.valor,
                asientos: recorrido.asientos,
                rutusuario: recorrido.rutusuario,
                conductor: usuario,
                tomado: false,
                hora: recorrido.hora,
            
                
              };
              this.idS = localStorage.setItem('idr',this.idtrecorrido)
              viajes.push(viaje);
            }
          } catch (error) {
            console.error('Error al obtener el usuario por rut:', error);
          }
        }
      }
    }

    return Promise.resolve(viajes);
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