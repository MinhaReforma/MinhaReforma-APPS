import { ReformasConcluidasPage } from './../reformas-concluidas/reformas-concluidas';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import Utils from '../../shared/utils';

@IonicPage()
@Component({
  selector: 'page-perfil-navigation',
  templateUrl: 'perfil-navigation.html',
})
export class PerfilNavigationPage {

  API_URL: string = Utils.getApi();
  perfil: any;
  id: any;
  perfilLoading: boolean = true;
  qtdeReformas: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient:HttpClient, private ngZone:NgZone, private storage: Storage, public modalCtrl: ModalController) {
    storage.get('profissional').then((val)=>{
      this.id = val;
      this.carregarUsuario();
    })
    this.storage.get('quantidadeReformas').then(val => {
      this.qtdeReformas = val;
    })
  }

  async carregarUsuario(){
    return await new Promise((resolve, reject) => {
      let url = this.API_URL + "profissionais/"+ this.id;

      this.httpClient.get(url).subscribe(
        (result: any) => {
          if(result){
            this.ngZone.run(()=>{
              console.log(result);
              this.perfil = result;
              this.perfilLoading = false;
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

  mostrarReformasFinalizadas() {
    let modal = this.modalCtrl.create('ReformasConcluidasPage');
    modal.present();
  }
}
