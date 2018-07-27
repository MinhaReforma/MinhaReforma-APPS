import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListarAvaliacoesPage } from './listar-avaliacoes';

@NgModule({
  declarations: [
    ListarAvaliacoesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListarAvaliacoesPage),
  ],
})
export class ListarAvaliacoesPageModule {}
