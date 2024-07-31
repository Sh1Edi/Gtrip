import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenupusuarioPageRoutingModule } from './menupusuario-routing.module';

import { MenupusuarioPage } from './menupusuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenupusuarioPageRoutingModule
  ],
  declarations: [MenupusuarioPage]
})
export class MenupusuarioPageModule {}
