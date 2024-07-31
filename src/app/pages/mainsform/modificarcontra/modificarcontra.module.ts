import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarcontraPageRoutingModule } from './modificarcontra-routing.module';

import { ModificarcontraPage } from './modificarcontra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarcontraPageRoutingModule
  ],
  declarations: [ModificarcontraPage]
})
export class ModificarcontraPageModule {}
