import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { Reforma } from '../../model/reforma.model';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  id: number;
  reformas:any = [];
  API_URL: string = "https://minhareforma.herokuapp.com/";
  constructor(public navCtrl: NavController, public navParam: NavParams, public modalCtrl: ModalController, public httpClient: HttpClient) {

    this.id = navParam.get("id");
    console.log(this.id);
  }

  criarReforma(){
    let modal = this.modalCtrl.create('CriaReformaPage', {"id":this.id});
    modal.onDidDismiss(data => {
      this.carregaReformas();
    });
    modal.present();


  }

  ionViewDidLoad(){
    this.carregaReformas();
  }

  async carregaReformas(){
    return await new Promise((resolve, reject) => {
      let url = this.API_URL + "reformas";

      this.httpClient.get(url).subscribe(
        (result: any) => {
          if(result){
            for(let i in result){
              this.reformas.push(result[i]);
            }


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
