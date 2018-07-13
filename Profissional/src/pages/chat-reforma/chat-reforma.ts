import { Storage } from "@ionic/storage";
import { HttpClient } from "@angular/common/http";
import { Component, NgZone } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";

/**
 * Generated class for the ChatReformaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-chat-reforma",
  templateUrl: "chat-reforma.html"
})
export class ChatReformaPage {
  API_URL: string = "https://minhareforma.herokuapp.com/";
  idReforma: any;
  profissional: any;
  id: any;
  conversa: any;
  mensagem: any;
  count: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpClient: HttpClient,
    public storage: Storage,
    public ngZone: NgZone,
    public toastCtrl: ToastController
  ) {
    this.idReforma = navParams.get("id");
    this.storage.get("profissional").then(val => {
      this.profissional = val;
    });
  }

  ionViewDidLoad() {
    setInterval(() => {
      this.carregaChat();
    }, 1000);
  }

  retornaPagina() {
    this.navCtrl.pop();
  }

  async carregaChat() {
    let url =
      this.API_URL + "conversas/" + this.idReforma + "/" + this.profissional;
    this.httpClient.get(url).subscribe(
      (data: any) => {
        this.ngZone.run(() => {
          if (data.mensagens.length != this.count) {
            this.conversa = data;
            this.count = data.mensagens.length;
          }
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
        perfil: "profissional",
        data: Date.now(),
        mensagem: this.mensagem
      })
      .subscribe(
        data => {
          this.mensagem = "";
        },
        err => {
          this.toastCtrl
            .create({
              message: err.message,
              duration: 1500,
              position: "bottom"
            })
            .present();
        }
      );
  }
}
