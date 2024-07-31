import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditaruserPageRoutingModule } from './editaruser-routing.module';

import { EditaruserPage } from './editaruser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditaruserPageRoutingModule,
  ],
  declarations: [EditaruserPage]
})
export class EditaruserPageModule {}
