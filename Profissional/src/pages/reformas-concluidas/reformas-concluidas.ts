import { Status } from './../../model/enum/status.enum';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import Utils from '../../shared/utils'


@IonicPage()
@Component({
  selector: 'page-reformas-concluidas',
  templateUrl: 'reformas-concluidas.html',
})
export class ReformasConcluidasPage {

  reformasConcluida: any = [];
  idCliente: any;
  API_URL: string = Utils.getApi();
  showNone: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient, private storage: Storage) {
    this.storage.get('profissional').then((val)=>{
      this.idCliente = val;
      this.carregaReformas();
    })
  }

  async carregaReformas(){
    return await new Promise((resolve, reject) => {
      let url = this.API_URL + "reformas/profissional/" + this.idCliente;

      this.httpClient.get(url).subscribe(
        (result: any) => {
          if(result.sucesso){
            this.reformasConcluida = result.reformas.filter((element) => {return element.status == Status.CONCLUIDO});
            if (this.reformasConcluida.length > 0) this.showNone = false;
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

  public getDate(data) {
    return Utils.getDate(data);
  }

  abrirDetalhes(ref){
    this.navCtrl.push("ReformaDetalhesPage", {"id": ref.id});
  }

}
