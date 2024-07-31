import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { Usuario } from 'src/app/services/class/usuario/usuario';

@Component({
  selector: 'app-modificarcontra',
  templateUrl: './modificarcontra.page.html',
  styleUrls: ['./modificarcontra.page.scss'],
})
export class ModificarcontraPage implements OnInit {

  nuevaContrasena: string = '';
  repetirContrasena: string = ''; 
  idUsuario: any= ''; 
  usuario: Usuario | null = null;
  contra: any= ''; 
  constructor(private router : Router, private bd : BdserviceService, private alertController: AlertController, private toastController: ToastController) { }

  ngOnInit() {
    const idUsuarioString = localStorage.getItem('id');
    if (idUsuarioString) {
      // Parsea el ID de usuario a un número
      this.idUsuario = parseInt(idUsuarioString, 10);
    }
    const idUsuario = localStorage.getItem('id');
    if (idUsuario) {
      this.bd.datosUsuario(Number(idUsuario)).then((usuario) => {
        if (usuario) {
          this.usuario = usuario;
          this.contra = usuario.contra;
        } else {
        }
      });
    } else {
      // Manejar el caso en el que idUsuario es nulo
    }
  }


  async presentAlert2(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentToast(ms:string) {
    const toast = await this.toastController.create({
      message: ms,
      duration: 1500,
      position: 'bottom',
      color : 'success',
    });

    await toast.present();
  }

  volver(){
    this.router.navigate(['/menupusuario']);
  }

  async modificarContrasena() {
    const idUsuario = localStorage.getItem('id');
    if (!idUsuario) {
      this.presentAlert('Error', 'No se ha encontrado el ID del usuario.');
      return;
    }

    if (!this.isValidPassword(this.nuevaContrasena)) {
      this.presentAlert('Error', 'La nueva contraseña no cumple con los requisitos.');
      return;
    }

    if (this.nuevaContrasena !== this.repetirContrasena) {
      this.presentAlert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      const resultado = await this.bd.modificarContrasena(
        Number(idUsuario),
        this.nuevaContrasena
      );

      if (resultado) {
        this.presentAlert('Éxito', 'Contraseña modificada con éxito.');
        this.router.navigate(['/login']);
        // Restablece el valor del campo de entrada
        this.nuevaContrasena = '';
        this.repetirContrasena = '';
      } else {
        this.presentAlert('Error', 'Hubo un problema al modificar la contraseña.');
      }
    } catch (error) {
      console.error('Error al modificar la contraseña:', error);
      this.presentAlert('Error', 'Hubo un problema al modificar la contraseña.');
    }
  }

  isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

    return passwordRegex.test(password);
  }
  async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
