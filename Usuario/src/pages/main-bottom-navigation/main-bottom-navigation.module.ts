import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainBottomNavigationPage } from './main-bottom-navigation';

@NgModule({
  declarations: [
    MainBottomNavigationPage,
  ],
  imports: [
    IonicPageModule.forChild(MainBottomNavigationPage),
  ]
})
export class MainBottomNavigationPageModule {}
