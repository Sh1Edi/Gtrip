import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-conductores',
  templateUrl: './conductores.page.html',
  styleUrls: ['./conductores.page.scss'],
})
export class ConductoresPage implements OnInit {

  arregloUsuarios : any = [
    {
      idusuario : '',
      rutusuario : '', 
      nombreusuario : '', 
      apellidousuario : '', 
      correoUsuario : '', 
      telefono : '', 
      idtablarol : ''
    }
  ]

  idtc : any = 3;

  constructor(private router : Router,private bd: BdserviceService) { 

  }

  ngOnInit() {

    this.bd.dbState().subscribe(res => {
      if(res){
        this.bd.fetchUserUsuario().subscribe(item => {
          this.arregloUsuarios = item;


        })
      }
      this.bd.listUsers(this.idtc); 
    })
   
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
