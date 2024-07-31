import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjustesadminPage } from './ajustesadmin.page';

const routes: Routes = [
  {
    path: '',
    component: AjustesadminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjustesadminPageRoutingModule {}
