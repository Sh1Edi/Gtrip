import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, ToastController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-solicitarcon',
  templateUrl: './solicitarcon.page.html',
  styleUrls: ['./solicitarcon.page.scss'],
})
export class SolicitarconPage implements OnInit {

  modelo : any = "";
  patente : any = "";
  numeroAsientos: any = "";
  maxasientos: any = "";
  imageSource : any;
  idUsuario : any = "";
  autoBoo : any = 2;
  ids2 : any = "";

  constructor(private bd : BdserviceService, private router : Router,private toastController: ToastController,private alertController: AlertController) { }

  ngOnInit() {
    this.idUsuario = localStorage.getItem('id');
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,   
      allowEditing: false,   // si se permite editar la foto es true si no se quiere permitir al usuario editar la foto es con un false
      resultType: CameraResultType.DataUrl,   //es una url con la info de la imagen
      source: CameraSource.Prompt    
    });
  
    this.imageSource =  image.dataUrl;
  };

  serConductor() {
    if (!this.imageSource) {
      this.presentAlert('Debes seleccionar una imagen antes de enviar el formulario.');
      return; 
    }
  
    if (!this.modelo || this.modelo.length < 3) {
      this.presentAlert('El modelo del vehículo debe tener al menos 3 letras.');
      return; 
    }
  
    if (!this.patente || this.patente.length < 6) {
      this.presentAlert('La patente del vehículo debe tener al menos 6 caracteres.');
      return; 
    }

    if (this.numeroAsientos == null || this.numeroAsientos < 1 || this.numeroAsientos > 10) {
      this.presentAlert('El número de asientos debe estar entre 1 y 10.');
      return; 
    }
  
    // Si todas las validaciones pasan, envía los datos a la base de datos
    this.bd.serConductor(this.modelo, this.patente, this.imageSource, this.idUsuario, this.numeroAsientos);
    this.bd.updateConduc(this.autoBoo, this.idUsuario);
    
    // Muestra un mensaje de éxito y redirige
    this.presentToast('Se envió la solicitud correctamente');
    this.router.navigate(['/menupusuario']);
  }
  
  volver(){
    this.router.navigate(['/ajustes']);
  }
  

  async presentToast(ms:string) {
    const toast = await this.toastController.create({
      message: ms,
      duration: 1500,
      position: 'top',
      color : 'success',
    });

    await toast.present();
  }

  async presentAlert(ms:string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: ms,
      buttons: [
         {
          text: 'Si',
         
        }
      ],
    });

    await alert.present();
  }
}
