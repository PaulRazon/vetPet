import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateProductPage } from './update-product.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateProductPageRoutingModule {}
