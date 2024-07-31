import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'menupusuario',
    loadChildren: () => import('./pages/usuario/menupusuario/menupusuario.module').then( m => m.MenupusuarioPageModule)
  },
  {
    path: 'perfilusuario',
    loadChildren: () => import('./pages/usuario/perfilusuario/perfilusuario.module').then( m => m.PerfilusuarioPageModule)
  },
  {
    path: 'menupadmin',
    loadChildren: () => import('./pages/administrador/menupadmin/menupadmin.module').then( m => m.MenupadminPageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./pages/administrador/clientes/clientes.module').then( m => m.ClientesPageModule)
  },
  {
    path: 'conductores',
    loadChildren: () => import('./pages/administrador/conductores/conductores.module').then( m => m.ConductoresPageModule)
  },
  {
    path: 'editarusuarios',
    loadChildren: () => import('./pages/administrador/editarusuarios/editarusuarios.module').then( m => m.EditarusuariosPageModule)
  },
  {
    path: 'eliminarbloquear',
    loadChildren: () => import('./pages/administrador/eliminarbloquear/eliminarbloquear.module').then( m => m.EliminarbloquearPageModule)
  },
  {
    path: 'editaruser',
    loadChildren: () => import('./pages/administrador/editaruser/editaruser.module').then( m => m.EditaruserPageModule)
  },
  {
    path: 'ajustesadmin',
    loadChildren: () => import('./pages/administrador/ajustesadmin/ajustesadmin.module').then( m => m.AjustesadminPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/mainsform/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/mainsform/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'ajustes',
    loadChildren: () => import('./pages/usuario/ajustes/ajustes.module').then( m => m.AjustesPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/mainsform/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'viaje',
    loadChildren: () => import('./pages/mainsform/viaje/viaje.module').then( m => m.ViajePageModule)
  },
  {
    path: 'solicitarcon',
    loadChildren: () => import('./pages/mainsform/solicitarcon/solicitarcon.module').then( m => m.SolicitarconPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./pages/usuario/historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'modificarcontra',
    loadChildren: () => import('./pages/mainsform/modificarcontra/modificarcontra.module').then( m => m.ModificarcontraPageModule)
  },  {
    path: 'map',
    loadChildren: () => import('./pages/usuario/map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'recuperarcontra',
    loadChildren: () => import('./pages/mainsform/recuperarcontra/recuperarcontra.module').then( m => m.RecuperarcontraPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
