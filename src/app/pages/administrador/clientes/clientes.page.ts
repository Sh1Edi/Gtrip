import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  arregloUsers: any = [
    {
      idusuario: '',
      rutusuario: '',
      nombreusuario: '',
      apellidousuario: '',
      correoUsuario: '',
      telefono: '',
      idtablarol: '',
      respuesta: '',
      preguntaselect: ''
    }
  ]
  idt: any = 2;

  constructor(private router: Router, private alertController: AlertController, private bd: BdserviceService) {

  }

  ngOnInit() {
    this.bd.dbState().subscribe(res => {
      if (res) {
        this.bd.fetchUserUsuario().subscribe(item => {
          this.arregloUsers = item;
        })
      }
      this.bd.listUsers(this.idt);
    })
  }

  //      REDIRECCIONES BOTONES

  irClientes() {
    this.router.navigate(['/clientes'])
  }

  irConductores() {
    this.router.navigate(['/conductores'])
  }

  //      REDIRECCIONES TABS

  irMenu() {
    this.router.navigate(['/menupadmin']);
  }
  bloquearEliminar() {
    this.router.navigate(['/eliminarbloquear'])
  }

  irEditar() {
    this.router.navigate(['/editarusuarios'])
  }
  irAjustes() {
    this.router.navigate(['/ajustesadmin'])
  }

}