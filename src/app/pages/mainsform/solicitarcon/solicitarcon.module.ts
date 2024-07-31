import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitarconPageRoutingModule } from './solicitarcon-routing.module';

import { SolicitarconPage } from './solicitarcon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitarconPageRoutingModule
  ],
  declarations: [SolicitarconPage]
})
export class SolicitarconPageModule {}
