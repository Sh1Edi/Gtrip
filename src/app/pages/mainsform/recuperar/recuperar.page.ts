import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  correo : any = "";
  respuesta : any = "";
  pregun : any = "";
  mensajeError: string = '';

  arregloPreguntas : any = [
    {
      idpregunta: '',
      pregunta: ''
    }
  ]

  constructor(private router : Router, private bd : BdserviceService, private alertController: AlertController) {
  }

  ngOnInit() {
    this.bd.dbState().subscribe(res => {
      if(res){
        this.bd.fetchPregunta().subscribe(item => {
          this.arregloPreguntas = item;
        });
      }
    }) 
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }


  recuperarCuenta(){
    this.bd.forgetPassword(this.correo, this.respuesta, this.pregun).then((usuario) => {
      if (usuario) {
        if (Number(usuario.idtablarol) === 1 && Number(usuario.status) == 1) {
          // Si el idtablarol es 1 (administrador), redirige a la vista de administrador
          let navigationsExtras: NavigationExtras = {
            state: {
              idusuarioEnviado : usuario.idusuario,
            },
          };
          this.router.navigate(['/recuperarcontra'], navigationsExtras);
        } else if (Number(usuario.idtablarol) === 2 && Number(usuario.status) == 1) {
          // Si el idtablarol es 2 (usuario normal), redirige a la página principal (home)
          this.mensajeError = ''; // Limpiar mensaje de error en caso de éxito
          let navigationsExtras : NavigationExtras = {
            state: {
              idusuarioEnviado : usuario.idusuario,
            }
          }
          this.router.navigate(['/recuperarcontra'], navigationsExtras);
        } else if (Number(usuario.idtablarol) === 3 && Number(usuario.status) == 1) {
          // Si el idtablarol es 2 (usuario normal), redirige a la página principal (home)
          this.mensajeError = ''; // Limpiar mensaje de error en caso de éxito
          let navigationsExtras : NavigationExtras = {
            state: {
              idusuarioEnviado : usuario.idusuario,
            }
          }
          this.router.navigate(['/recuperarcontra'], navigationsExtras);
        }else if (Number(usuario.idtablarol) === 1 && Number(usuario.status) == 2 || Number(usuario.idtablarol) === 2 && Number(usuario.status) == 2 || Number(usuario.idtablarol) === 3 && Number(usuario.status) == 2) {
          this.presentAlert('Tu cuenta ha sido Bloqueada.');
        }else {
          // Otros roles pueden ser manejados de manera similar
          this.presentAlert('Credenciales Incorrectas.');
        }
      } else {
        // Las credenciales son incorrectas o el usuario no existe
        this.presentAlert('Credenciales incorrectas. Inténtalo de nuevo.');
      }
    });
  }

  volver(){
    this.router.navigate(['/login']);
  }


}
