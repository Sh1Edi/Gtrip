import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //formulario de validacion
  formularioLogin: FormGroup;
  mensajeError: string = '';

  constructor(private fb: FormBuilder, private router: Router, private toastController: ToastController, private alertController: AlertController,private dbService: BdserviceService) {
    this.formularioLogin = this.fb.group({
      nombre: ['', [Validators.required,]],
      password: ['', [Validators.required,]]
   
    });

  }

  ngOnInit() {
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async toggleRecordar(event: any) {
    const isChecked = event.detail.checked;
    const message = isChecked
      ? 'Recordar contraseña está activada.'
      : 'Recordar contraseña está desactivada.';

    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });

    await toast.present();
  }


  onSubmit() {
    if (this.formularioLogin.valid) {
      const nombre = this.formularioLogin.value.nombre;
      const password = this.formularioLogin.value.password;
  
      // Llama a una función en el servicio para verificar las credenciales
      this.dbService.InicioSesion(nombre, password).then((usuario) => {
        if (usuario) {
          if (Number(usuario.idtablarol) === 1 && Number(usuario.status) == 1) {
            // Si el idtablarol es 1 (administrador), redirige a la vista de administrador
            let navigationsExtras: NavigationExtras = {
              state: {
                idusuarioEnviado : usuario.idusuario,
                nombreEnviado: usuario.nombreusuario,
                rutEnviado: usuario.rutusuario,
                apellidoEnviado: usuario.apellidousuario,
                correoEnviado: usuario.correoUsuario,
                telefonoEnviado: usuario.telefono,
                fotoEnviado: usuario.fotousuario,
                idtablarolEnviado: usuario.idtablarol,
                contraEnviado: usuario.contra,
              },
            };
            this.router.navigate(['/menupadmin'], navigationsExtras);
          } else if (Number(usuario.idtablarol) === 2 && Number(usuario.status) == 1) {
            // Si el idtablarol es 2 (usuario normal), redirige a la página principal (home)
            this.mensajeError = ''; // Limpiar mensaje de error en caso de éxito
            let navigationsExtras : NavigationExtras = {
              state: {
                idusuarioEnviado : usuario.idusuario,
                nombreEnviado: usuario.nombreusuario,
                rutEnviado: usuario.rutusuario,
                apellidoEnviado: usuario.apellidousuario,
                correoEnviado: usuario.correoUsuario,
                telefonoEnviado: usuario.telefono,
                fotoEnviado: usuario.fotousuario,
                idtablarolEnviado: usuario.idtablarol,
                contraEnviado: usuario.contra,
              }
            }
            this.router.navigate(['/menupusuario'], navigationsExtras);
          } else if (Number(usuario.idtablarol) === 3 && Number(usuario.status) == 1) {
            // Si el idtablarol es 2 (usuario normal), redirige a la página principal (home)
            this.mensajeError = ''; // Limpiar mensaje de error en caso de éxito
            let navigationsExtras : NavigationExtras = {
              state: {
                idusuarioEnviado : usuario.idusuario,
                nombreEnviado: usuario.nombreusuario,
                rutEnviado: usuario.rutusuario,
                apellidoEnviado: usuario.apellidousuario,
                correoEnviado: usuario.correoUsuario,
                telefonoEnviado: usuario.telefono,
                fotoEnviado: usuario.fotousuario,
                idtablarolEnviado: usuario.idtablarol,
                contraEnviado: usuario.contra,
              }
            }
            this.router.navigate(['/menupusuario'], navigationsExtras);
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
    } else {
      this.presentAlert('Por favor, completa todos los campos.');
    }
  }

  mostrarContrasena: boolean = false;
  toggleMostrarContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }
  irRecuperar() {
    this.router.navigate(['/recuperar'])
  }

  irEleccion() {
    this.router.navigate(['/eleccion-inicio'])
  }

}
