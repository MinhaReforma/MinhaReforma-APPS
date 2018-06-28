import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilNavigationPage } from './perfil-navigation';

@NgModule({
  declarations: [
    PerfilNavigationPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilNavigationPage),
  ],
})
export class PerfilNavigationPageModule {}
