import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-recuperarcontra',
  templateUrl: './recuperarcontra.page.html',
  styleUrls: ['./recuperarcontra.page.scss'],
})
export class RecuperarcontraPage implements OnInit {

  storage : any = "";
  sto : any = "";
  nuevaContrasena: string = '';
  repetirContrasena: string = ''; 
  constructor(private router: Router, private bd : BdserviceService, private alertController: AlertController, private activedRouter: ActivatedRoute) {
    this.activedRouter.queryParams.subscribe(param=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.storage = this.router.getCurrentNavigation()?.extras?.state?.['idusuarioEnviado'];
        localStorage.setItem('id', this.storage);
      }
      
    });
    
   }

  ngOnInit() {
    this.storage = localStorage.getItem('id');
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




  //redirecciones
  volver(){
    localStorage.clear();
    this.router.navigate(['/home'])
  }

}
