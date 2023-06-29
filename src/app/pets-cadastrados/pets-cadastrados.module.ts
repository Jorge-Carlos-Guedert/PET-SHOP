import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PetsCadastradosPageRoutingModule } from './pets-cadastrados-routing.module';

import { PetsCadastradosPage } from './pets-cadastrados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetsCadastradosPageRoutingModule,
  ],
  declarations: [PetsCadastradosPage],
  exports: [PetsCadastradosPage],
})
export class PetsCadastradosPageModule {}
