import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-eliminarbloquear',
  templateUrl: './eliminarbloquear.page.html',
  styleUrls: ['./eliminarbloquear.page.scss'],
})
export class EliminarbloquearPage implements OnInit {

  arregloUsuarios : any = [
    {
      idusuario: '',
      correoUsuario: '',
      idtablarol: '',
      status: ''
    }
  ]

  arregloTabla : any = [
    {
      idrol : '',
      nombrerol : ''
    }
  ]

  status : any = 2;

  constructor(private router : Router,private alertController: AlertController,private toastController: ToastController, private bd : BdserviceService) { }

  ngOnInit() {
    this.bd.dbState().subscribe(res => {
      if(res){
        this.bd.fetchUsuario().subscribe(item => {
          this.arregloUsuarios = item;
        })
      }
    })

    this.bd.dbState().subscribe(res => {
      if(res){
        this.bd.fetchRol().subscribe(item => {
          this.arregloTabla = item;
        })
      }
    })
  }

  //funciones de base de datos
  

  //ALERT
  async presentToast(ms:string) {
    const toast = await this.toastController.create({
      message: ms,
      duration: 1500,
      position: 'top',
      color : 'danger',
    });

    await toast.present();
  }
  
  async presentAlert2(ms:string, x : any) {
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
            console.log("Bloqueado")
            this.bd.bloquearUsuario(this.status, x);
            this.presentToast('Cuenta bloqueada exitosamente');
          }
        }
      ],
    });

    await alert.present();
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
            this.presentToast('Cuenta eliminada exitosamente');
          }
        }
      ],
    });

    await alert.present();
  }
  
  //Botones
  bloquear(x : any){
    this.presentAlert2("¿Seguro que quieres bloquear esta cuenta?", x.idusuario);
  }

  eliminar(x : any){
    this.presentAlert3("¿Seguro que quieres eliminar esta cuenta?", x.idusuario);
  }

  //      REDIRECCIONES

  irMenuUsuarios() {
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

}
