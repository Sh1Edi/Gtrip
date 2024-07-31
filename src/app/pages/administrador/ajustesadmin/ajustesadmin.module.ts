import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjustesadminPageRoutingModule } from './ajustesadmin-routing.module';

import { AjustesadminPage } from './ajustesadmin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjustesadminPageRoutingModule
  ],
  declarations: [AjustesadminPage]
})
export class AjustesadminPageModule {}
