import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { Usuario } from 'src/app/services/class/usuario/usuario';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {
  //declaracion de variables

  arregloUsuarios : any = [
    {
      idusuario: '',
      correoUsuario: '',
      idtablarol: '',
      status: ''
    }
  ]
  usuario: Usuario | null = null;
  auto : any = "";
  idrol : any = "";

  arregloVehiculos : any = [
    {
      idv : '',
      modelovehiculo : '',
      patente : '',
      fotov: '',
      estadovehiculo: '',
      idu: ''
    }
  ]

  iduser : any = "";
  constructor(private router : Router,private alertController: AlertController,private toastController: ToastController, private bd : BdserviceService) { 
    
  }

  ngOnInit() {
    const idUsuario = localStorage.getItem('id');
    if (idUsuario) {
      this.bd.datosUsuario(Number(idUsuario)).then((usuario) => {
        if (usuario) {
          this.usuario = usuario;
          this.idrol = usuario.idtablarol;
          this.iduser = usuario.idusuario;
          this.auto = usuario.auto;
          this.bd.datoV(this.iduser);
        } else {
          this.presentAlert('Inicie sesión.' + idUsuario);
          this.router.navigate(['/login']);
        }
      });
    } else {
      // Manejar el caso en el que idUsuario es nulo
    }
    //
    this.bd.dbState().subscribe((res) => {
      if (res) {
        this.bd.fetchVehiculoUno().subscribe((item) => {
          this.arregloVehiculos = item;
        });
      }
    });
  }
  //      CERRAR SESION INICIO
  async cerrarSesion() {
    await this.router.navigate(['/home']);

    const toast = await this.toastController.create({
      message: 'Sesión cerrada exitosamente',
      duration: 3000, // Duración en milisegundos
      position: 'bottom', // Posición del toast en la pantalla
      color: 'success' // Color del toast
    });
  
    await toast.present();
  }
  //      CERRAR SESION FIN

  //      REDIRECCIONES INICIO
  irPerfil(){
    this.router.navigate(['/perfilusuario']);
  }
  
  formSolicitar(){
    this.router.navigate(['/solicitarcon']);
  }


  irAjustes() {
    this.router.navigate(['/ajustes']);
  }
  ubicacion() {
    this.router.navigate(['/map']);
  }

  irMenu() {
    this.router.navigate(['/menupusuario']);
  }
  irHistorial(){
    this.router.navigate(['/historial']);
  }
  //      REDIRECCIONES FIN

  //      Notificaciones Inicio
  notiOn(){
    this.presentAlert("Notificaciones Activadas");
  }
  notiVibrate(){
    this.presentAlert("Notificaciones en vibracion");
  }
  notiOff(){
    this.presentAlert("Notificaciones Desactivadas");
  }
  //      Notificaciones Fin

  //    ELIMINAR CUENTA msj+redireccion INICIO
  eliminarCuenta(){
    this.presentAlert2("¿Seguro que quieres eliminar tu cuenta?");
  }

  async presentAlert2(ms:string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: ms,
      buttons: [
        
        {
          text: 'No',
          handler: () =>{
            console.log("No cancel")
          }
        },
        {
          text: 'Si',
          handler: () => {
            this.router.navigate(['/login']);
            this.presentToast('top');
            console.log("Eliminado")
          }
        }
      ],
    });

    await alert.present();
  }
  //    ELIMINAR CUENTA msj+redireccion FIN
  
  //    MENSAJES INICIO

  async presentAlert(ms:string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: ms,
      buttons: ['Confirmar'],
    });

    await alert.present();
  }
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Cuenta eliminada correctamente',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }
  async presentAlert3(ms:string, x : any) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: ms,
      buttons: [
        
        {
          text: 'No',
          handler: () =>{
            console.log("No cancel")
          }
        },
        {
          text: 'Si',
          handler: () => {
            console.log("Eliminado")
            this.bd.deleteUsuario(x);

          }
        }
      ],
    });

    await alert.present();
  }
  //    MENSAJES FIN

  //FIN del code
}
