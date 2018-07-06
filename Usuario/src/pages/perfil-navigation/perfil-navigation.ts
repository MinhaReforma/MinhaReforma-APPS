import { HttpClient } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
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

  API_URL: string = "https://minhareforma.herokuapp.com/";
  perfil: any;
  id: any;
  perfilLoading: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient:HttpClient, private ngZone:NgZone, private storage: Storage) {
    this.storage.get('cliente').then((val)=>{
      this.id = val;
      this.carregarUsuario();
    })
  }

  async carregarUsuario(){
      return await new Promise((resolve, reject) => {
        let url = this.API_URL + "clientes/" + this.id;

        this.httpClient.get(url).subscribe(
          (result: any) => {
            if(result){
              this.ngZone.run(()=>{
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
