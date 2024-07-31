import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenupusuarioPage } from './menupusuario.page';

const routes: Routes = [
  {
    path: '',
    component: MenupusuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenupusuarioPageRoutingModule {}
