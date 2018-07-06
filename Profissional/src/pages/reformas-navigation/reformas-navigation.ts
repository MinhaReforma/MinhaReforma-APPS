import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-reformas-navigation',
  templateUrl: 'reformas-navigation.html',
})
export class ReformasNavigationPage {
  showNone: boolean = true;
  tiposReformas:string;
  id: number;
  reformas:any = [];
  API_URL: string = "https://minhareforma.herokuapp.com/";

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public httpClient: HttpClient) {
    this.tiposReformas = 'minhas';
  }

  ionViewDidLoad(){
    this.carregaReformas();
  }

  abrirDetalhes(ref){
    this.navCtrl.push("ReformaDetalhesPage", {"id": ref.id});
  }

  async carregaReformas(){
    return await new Promise((resolve, reject) => {
      let url = this.API_URL + "reformas";

      this.httpClient.get(url).subscribe(
        (result: any) => {
          if(result.sucesso){
            this.showNone = false;
              this.reformas = result.reformas;
          }
        },
        error => {}
      );
    });
  }

}
