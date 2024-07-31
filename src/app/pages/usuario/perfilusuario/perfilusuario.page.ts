import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ToastController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { Usuario } from 'src/app/services/class/usuario/usuario';

@Component({
  selector: 'app-perfilusuario',
  templateUrl: './perfilusuario.page.html',
  styleUrls: ['./perfilusuario.page.scss'],
})
export class PerfilusuarioPage implements OnInit {
  usuario: Usuario | null = null;

  nombre: any = "";
  apellido: any = "";
  telefono: any = "";
  correo: any = "";

  imageSource: any = "";

  constructor(private router: Router, private dbService: BdserviceService, private toastController: ToastController) { }


  ngOnInit() {
    const idUsuario = localStorage.getItem('id');
    if (idUsuario) {

      this.dbService.datosUsuario(Number(idUsuario)).then((usuario) => {
        if (usuario) {
          this.usuario = usuario;
        } else {
          this.router.navigate(['/login']);
        }
      });
    }
  }
  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt
    });
  
    this.imageSource = image.dataUrl;
  
    // Asigna la imagen tomada a la propiedad de usuario (fotousuario).
    if (this.usuario) {
      this.usuario.fotousuario = this.imageSource;
    }
  }
    guardarCambios(){
      if (this.nombre.length < 1) {
        this.nombre = this.usuario?.nombreusuario;
      }
      if (this.apellido.length < 1) {
        this.apellido = this.usuario?.apellidousuario;
      }
      if (this.correo.length < 1) {
        this.correo = this.usuario?.correoUsuario;
      }
      if (this.telefono.length < 1) {
        this.telefono = this.usuario?.telefono
      }
      this.presentToast('top');
      this.dbService.modificarPerfil(this.nombre,this.apellido,this.correo,this.telefono,this.usuario?.fotousuario ,this.usuario?.idusuario);
      this.dbService.presentAlert("Perfil Modificado");

    }
  async presentToast(position: 'top') {
      const toast = await this.toastController.create({
        message: 'Sus datos fueron modificados con exito',
        duration: 1500,
        position: position,
      });

      await toast.present();
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

    irCambiarContrasena() {
      this.router.navigate(['/modificarcontra']);
    }

  }
