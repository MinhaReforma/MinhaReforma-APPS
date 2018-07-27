import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import Utils from '../../shared/utils';
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-avaliar-cliente',
  templateUrl: 'avaliar-cliente.html',
})
export class AvaliarClientePage {
  API_URL: string = Utils.getApi();
  id: any;
  idCliente: any;
  nota: number;
  mensagem: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient, public storage: Storage, public toastCtrl: ToastController) {
    this.storage.get("idClienteAvaliar").then(val => {
      this.idCliente = val;
    });
    this.storage.get("profissional").then(val => {
      this.id = val;
    });
  }

  darEstrela(event, nota) {
    let div = event.target.parentElement;
    this.nota = nota
    for (let elem of div.children) {
      if (elem.id <= nota) {
        elem.style.color = '#E3B23C'
      } else {
        elem.style.color = '#ddd'
      }
    }
  }

  private enviaAvaliacao() {
    return new Promise((resolve, reject) => {
      let url = this.API_URL + "avaliacao";
      this.httpClient
        .post(url, {id_avaliador: this.id, id_avaliado: this.idCliente, mensagem: this.mensagem, nota: this.nota, tipo:'profissional'})
        .subscribe(
          (result: any) => {
            if (result.sucesso == true) {
              this.toastCtrl
                .create({
                  message: result.mensagem,
                  duration: 1500,
                  position: "bottom"
                })
                .present();
              this.navCtrl.pop();
            }
          },
          error => {
          }
        );
    });
  }

  closeModal() {
    this.navCtrl.pop();
  }

}
