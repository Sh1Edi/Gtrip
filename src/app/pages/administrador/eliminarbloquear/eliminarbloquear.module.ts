import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EliminarbloquearPageRoutingModule } from './eliminarbloquear-routing.module';

import { EliminarbloquearPage } from './eliminarbloquear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EliminarbloquearPageRoutingModule
  ],
  declarations: [EliminarbloquearPage]
})
export class EliminarbloquearPageModule {}
