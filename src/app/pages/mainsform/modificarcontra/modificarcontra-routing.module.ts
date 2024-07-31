import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarcontraPage } from './modificarcontra.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarcontraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarcontraPageRoutingModule {}
