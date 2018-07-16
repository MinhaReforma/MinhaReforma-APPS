import { Storage } from '@ionic/storage';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import Utils from '../../shared/utils';


/**
 * Generated class for the ChatReformaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-reforma',
  templateUrl: 'chat-reforma.html',
})
export class ChatReformaPage {
  API_URL: string = "https://minhareforma.herokuapp.com/";
  idReforma: any;
  cliente: any;
  id: any;
  conversa: any;
  mensagem: any;
  idProfissional: any;
  timeoutId: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpClient: HttpClient,
    public storage: Storage,
    public ngZone: NgZone,
    public toastCtrl: ToastController
  ) {
    this.idProfissional = navParams.get("idProfissional");
    this.idReforma = navParams.get("id");
    this.storage.get("cliente").then(val => {
      this.cliente = val;
    });
  }

  ionViewDidLoad() {
    this.timeoutId = setInterval(()=>{this.carregaChat()}, 1000);
  }

  ionViewWillLeave(){
    clearTimeout(this.timeoutId);
  }

  async carregaChat() {
    let url =
      this.API_URL + "conversas/" + this.idReforma + "/" + this.idProfissional;
    this.httpClient.get(url).subscribe(
      data => {
        this.ngZone.run(() => {
          this.conversa = data;
        });
      },
      err => {}
    );
  }

  async enviaMensagem() {
    if (this.mensagem.trim().length < 1) {
      return;
    }
    let url = this.API_URL + "conversas/mensagem";
    this.httpClient
      .post(url, {
        id_conversa: this.conversa.id,
        perfil: "cliente",
        data: Date.now(),
        mensagem: this.mensagem
      })
      .subscribe(
        data => {
          this.mensagem = "";
        },
        err => {
          this.toastCtrl.create({
            message: err.message,
            duration: 1500,
            position: 'bottom'
          }).present();
        }
      );
  }
  public getTime(t) {
    return Utils.getTime(t);
  }
}
