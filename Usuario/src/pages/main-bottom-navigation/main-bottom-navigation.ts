import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the MainBottomNavigationPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main-bottom-navigation',
  templateUrl: 'main-bottom-navigation.html'
})
export class MainBottomNavigationPage {

  perfilNavigationRoot = 'PerfilNavigationPage'
  reformasNavigationRoot = 'ReformasNavigationPage'


  constructor(public navCtrl: NavController) {}

}
