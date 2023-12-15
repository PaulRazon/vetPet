import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalsalePageRoutingModule } from './modalsale-routing.module';

import { ModalsalePage } from './modalsale.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalsalePageRoutingModule
  ],
  declarations: [ModalsalePage]
})
export class ModalsalePageModule {}
