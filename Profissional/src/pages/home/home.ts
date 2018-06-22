import { HttpClient } from '@angular/common/http';
import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  API_URL: string = "https://minhareforma.herokuapp.com/";
  reformas:any = [];
  constructor(public navCtrl: NavController, public httpClient: HttpClient) {

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
