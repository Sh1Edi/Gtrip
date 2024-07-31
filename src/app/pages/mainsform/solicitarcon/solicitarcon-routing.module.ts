import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitarconPage } from './solicitarcon.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitarconPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitarconPageRoutingModule {}
