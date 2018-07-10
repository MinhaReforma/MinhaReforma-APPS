import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilClientePage } from './perfil-cliente';

@NgModule({
  declarations: [
    PerfilClientePage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilClientePage),
  ],
})
export class PerfilClientePageModule {}
