import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenupadminPageRoutingModule } from './menupadmin-routing.module';

import { MenupadminPage } from './menupadmin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenupadminPageRoutingModule
  ],
  declarations: [MenupadminPage]
})
export class MenupadminPageModule {}
