import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import Utils from '../../shared/utils';

/**
 * Generated class for the PerfilNavigationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient:HttpClient, private ngZone:NgZone, private storage: Storage) {
    storage.get('profissional').then((val)=>{
      this.id = val;
      this.carregarUsuario();
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
}
