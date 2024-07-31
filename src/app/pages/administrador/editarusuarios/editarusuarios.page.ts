import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-editarusuarios',
  templateUrl: './editarusuarios.page.html',
  styleUrls: ['./editarusuarios.page.scss'],
})
export class EditarusuariosPage implements OnInit {

  arregloUsuarios : any = [
    {
      idusuario: '',
      rutusuario: '',
      nombreusuario : '',
      apellidousuario: '',
      correoUsuario: '',
      telefono : '',
      idtablarol: '',
      status : '',
      auto : ''
    }
  ]

  arregloTabla : any = [
    {
      idrol : '',
      nombrerol : ''
    }
  ]

  constructor(private router : Router, private bd : BdserviceService) { }

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


  botonEditar(x : any){
    let navigationsExtras : NavigationExtras = {
      state: {
        idEnviado : x.idusuario,
        rutEnviado : x.rutusuario,
        nombreEnviado : x.nombreusuario,
        apellidoEnviado : x.apellidousuario,
        correoEnviado : x.correoUsuario,
        telefonoEnviado : x.telefono,
        rolEnviado : x.idtablarol,
        statusEnviado : x.status,
        autoEnviado : x.auto
      }
    }
    this.router.navigate(['/editaruser'], navigationsExtras);
  }

  //      REDIRECCIONES TABS

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

}
