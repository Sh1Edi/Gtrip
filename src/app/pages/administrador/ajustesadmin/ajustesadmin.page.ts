import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-ajustesadmin',
  templateUrl: './ajustesadmin.page.html',
  styleUrls: ['./ajustesadmin.page.scss'],
})
export class AjustesadminPage implements OnInit {

  constructor(private router: Router,private alertController: AlertController,private toastController: ToastController) { }

  ngOnInit() {
  }

  async cerrarSesion() {
    await this.router.navigate(['/home']);

    const toast = await this.toastController.create({
      message: 'Sesión cerrada exitosamente',
      duration: 5000, // Duración en milisegundos
      position: 'bottom', // Posición del toast en la pantalla
      color: 'success' // Color del toast
    });
  
    await toast.present();
  }

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
  
  eliminarCuenta(){
    this.presentAlert2("¿Seguro que quieres eliminar tu cuenta?");
  }
  notiOn(){
    this.presentAlert("Notificaciones Activadas");
  }
  notiVibrate(){
    this.presentAlert("Notificaciones en vibracion");
  }
  notiOff(){
    this.presentAlert("Notificaciones Desactivadas");
  }

}
