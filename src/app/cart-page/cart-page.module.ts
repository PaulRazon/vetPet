import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPagePageRoutingModule } from './cart-page-routing.module';

import { CartPagePage } from './cart-page.page';
import { ToolbarModule } from "../toolbar/toolbar.module";

@NgModule({
    declarations: [CartPagePage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CartPagePageRoutingModule,
        ToolbarModule
    ]
})
export class CartPagePageModule {}
