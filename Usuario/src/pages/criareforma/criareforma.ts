import { Reforma } from './../../model/reforma.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-criareforma',
  templateUrl: 'criareforma.html',
})
export class CriaReformaPage{
  API_URL: string = "https://minhareforma.herokuapp.com/";
  input = {nome: "", descricao: "" };
  id: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient, public toastCtrl: ToastController) {
    this.id = parseInt(window.localStorage.usuarioId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CriareformaPage');
  }

  closeModal(){
    this.navCtrl.pop();
  }

  criarReforma(){
    return new Promise((resolve, reject) => {
      let url = this.API_URL + "reformas";

      this.httpClient.post(url, new Reforma(this.id, this.input.nome, this.input.descricao)).subscribe(
        (result: any) => {
          console.log(result);
          console.log(result.sucesso);
          if(result.sucesso == true){
            this.toastCtrl.create({
              message: 'Solicitação de reforma registrada',
              duration: 1500,
              position: 'bottom'
            }).present();
            this.navCtrl.pop();
          }
          //resolve(result.json());
        },
        error => {
          //reject(error.json());
        }
      );
    })
  }

}
