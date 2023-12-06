import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerCitasPage } from './ver-citas.page';

const routes: Routes = [
  {
    path: '',
    component: VerCitasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerCitasPageRoutingModule {}
