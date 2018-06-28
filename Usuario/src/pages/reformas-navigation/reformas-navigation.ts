import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReformasNavigationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reformas-navigation',
  templateUrl: 'reformas-navigation.html',
})
export class ReformasNavigationPage {

  tiposReformas:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tiposReformas = 'minhas';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReformasNavigationPage');
  }

}
