import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaProfissionalPage } from './lista-profissional';

@NgModule({
  declarations: [
    ListaProfissionalPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaProfissionalPage),
  ],
})
export class ListaProfissionalPageModule {}
