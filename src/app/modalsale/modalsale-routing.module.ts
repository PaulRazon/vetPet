import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalsalePage } from './modalsale.page';

const routes: Routes = [
  {
    path: '',
    component: ModalsalePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalsalePageRoutingModule {}
