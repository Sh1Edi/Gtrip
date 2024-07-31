import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-editaruser',
  templateUrl: './editaruser.page.html',
  styleUrls: ['./editaruser.page.scss'],
})
export class EditaruserPage implements OnInit {

  id : string = "";
  rutuser : string = "";
  nombreuser: string = "";
  apellidouser : string = "";
  correouser : string = "";
  telefonouser : string = "";
  roluser : any = "";
  statusUser : any = "";
  autoUser : any = "";
  arregloTabla : any;

  vehiculo : any = [
    {
      idu : '',
      estadovehiculo: '',
      modelovehiculo: '',
      patente: ''
    }
  ];
  eleccion : any;

  desbloquearUser : any = 1;
  
  constructor(private router: Router, private activedRouter: ActivatedRoute, private bd : BdserviceService, private alertController: AlertController, private toastController: ToastController) { 
    this.activedRouter.queryParams.subscribe(param=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.id = this.router.getCurrentNavigation()?.extras?.state?.['idEnviado'];
        this.rutuser = this.router.getCurrentNavigation()?.extras?.state?.['rutEnviado'];
        this.nombreuser = this.router.getCurrentNavigation()?.extras?.state?.['nombreEnviado'];
        this.apellidouser = this.router.getCurrentNavigation()?.extras?.state?.['apellidoEnviado'];
        this.correouser = this.router.getCurrentNavigation()?.extras?.state?.['correoEnviado'];
        this.telefonouser = this.router.getCurrentNavigation()?.extras?.state?.['telefonoEnviado'];
        this.roluser = this.router.getCurrentNavigation()?.extras?.state?.['rolEnviado'];
        this.statusUser = this.router.getCurrentNavigation()?.extras?.state?.['statusEnviado'];
        this.autoUser = this.router.getCurrentNavigation()?.extras?.state?.['autoEnviado'];
      }
      this.bd.buscarRolSeleccionado(this.roluser);    
      
      this.bd.datoV(this.id);
    });
  }

  ngOnInit() {
    this.bd.dbState().subscribe(res => {
      if(res){
        this.bd.fetchRol().subscribe(item => {
          this.arregloTabla = item;
        });
        this.bd.fetchRolSeleccionado().subscribe((i) => {
          this.eleccion = i[0];
        });
        this.bd.fetchVehiculo().subscribe((vehi) => {
          this.vehiculo = vehi;
        })
      }
    }) 
  }
  
  botonConfirmar(c : any){  
    this.bd.editarStatus(c.idrol, this.id);
    this.router.navigate(['/editarusuarios'])
  }
  
  volver(){
    this.router.navigate(['/editarusuarios'])
  }

  desbloquear(){
    this.presentAlert("¿Seguro que quieres eliminar esta cuenta?");
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
          text: 'No',
          handler: () =>{
            console.log("No cancel")
          }
        },
        {
          text: 'Si',
          handler: () => {
            this.bd.desbloquearStatus(this.desbloquearUser, this.id)
            this.presentToast('Cuenta desbloqueada exitosamente');
          }
        }
      ],
    });

    await alert.present();
  }

}
