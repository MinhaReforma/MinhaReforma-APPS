import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvaliacoesListaPage } from './avaliacoes-lista';

@NgModule({
  declarations: [
    AvaliacoesListaPage,
  ],
  imports: [
    IonicPageModule.forChild(AvaliacoesListaPage),
  ],
})
export class AvaliacoesListaPageModule {}
