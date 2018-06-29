import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the ReformaDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reforma-detalhes',
  templateUrl: 'reforma-detalhes.html',
})
export class ReformaDetalhesPage {

  API_URL: string = "https://minhareforma.herokuapp.com/";
  reforma:any;
  id:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient) {
    this.id = navParams.get("id");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReformaDetalhesPage');
  }
  ionViewWillLoad(){
    this.carregaReformaDetalhe();
  }

  async carregaReformaDetalhe(){
    return await new Promise((resolve, reject) => {
      let url = this.API_URL + "reformas/id";

      this.httpClient.get(url,this.id).subscribe(
        (result: any) => {
          if(result){

              this.reforma = result;



          }
          //resolve(result.json());
        },
        error => {
          //reject(error.json());
        }
      );
    });
  }



}
