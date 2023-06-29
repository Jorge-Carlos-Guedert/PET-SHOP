import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetsCadastradosPage } from './pets-cadastrados.page';

const routes: Routes = [
  {
    path: '',
    component: PetsCadastradosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetsCadastradosPageRoutingModule {}
