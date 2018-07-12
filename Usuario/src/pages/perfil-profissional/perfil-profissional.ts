import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the PerfilProfissionalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil-profissional',
  templateUrl: 'perfil-profissional.html',
})
export class PerfilProfissionalPage {

  API_URL: string = "https://minhareforma.herokuapp.com/";
  profissional: Object;
  id: NavParams;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient:HttpClient, private ngZone:NgZone) {
    this.id = navParams.get("profissional");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilProfissionalPage');
  }

  async carregaPerfilProfissional(){
    let url =
      this.API_URL +"profissionais/"+ this.id;
    this.httpClient.get(url).subscribe(
      data => {
        this.ngZone.run(() => {
          this.profissional = data;
        });
      },
      err => {}
    );
  }



}
