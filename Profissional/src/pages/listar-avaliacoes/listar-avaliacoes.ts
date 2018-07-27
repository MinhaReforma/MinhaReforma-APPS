import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import Utils from '../../shared/utils';
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-listar-avaliacoes',
  templateUrl: 'listar-avaliacoes.html',
})
export class ListarAvaliacoesPage {

  listaAvaliacoes: any;
  API_URL: string = Utils.getApi();
  id: any;
  minhaMedia: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient:HttpClient, private ngZone:NgZone, private storage: Storage) {
    storage.get('profissional').then((val)=>{
      this.id = val;
      this.carregarAvaliacoes();
    })
  }

  private async carregarAvaliacoes() {
    return await new Promise((resolve, reject) => {
      let url = this.API_URL + "avaliacao/profissional/"+ this.id;

      this.httpClient.get(url).subscribe(
        (result: any) => {
          if(result){
            this.ngZone.run(()=>{
              this.listaAvaliacoes = result.avaliacoes;
              for (let i = 0; i < result.avaliacoes.length; i++) {
                this.minhaMedia += result.avaliacoes[i].nota;
              }
            });

          }
          //resolve(result.json());
        },
        error => {
          //reject(error.json());
        }
      );
    });
  }

  closeModal() {
    this.navCtrl.pop();
  }

}
