import { Storage } from '@ionic/storage';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import Utils from '../../shared/utils';

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
  preco: number = 0;
  negociacao: any = {
    nivelPreco: 0,
    msgId: undefined
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpClient: HttpClient,
    public storage: Storage,
    public ngZone: NgZone,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
  ) {
    this.idProfissional = navParams.get("idProfissional");
    this.idReforma = navParams.get("id");
    this.storage.get("cliente").then(val => {
      this.cliente = val;
    });
  }

  ionViewWillEnter() {
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
        mensagem: this.mensagem,
        preco: this.preco,
        nivelPreco: 0
      })
      .subscribe(
        data => {
          this.mensagem = "";
          this.removerPreco();
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

  public mostrarInformarPreco() {
    const prompt = this.alertCtrl.create({
      title: 'Negociar',
      message: "Informe o preço que você gostaria de negociar com este profissional.",
      inputs: [
        {
          name: 'preco',
          placeholder: 'Preço',
          type: 'number',
          min: 1
        },
      ],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Inserir',
          handler: data => {
            this.preco = data.preco
          }
        }
      ]
    });
    prompt.present();
  }

  public removerPreco() {
    this.preco = 0;
  }

  public aceitarPreco(id) {
    if (id == this.negociacao.msgId) {
      this.mostrarDialogNegociacao(
        'Iniciar negociação',
        'Deseja negociar este preço como o final? Isto confirmará o orçamento em...',
        () => {
          this.negociaPreco(() => {
            this.negociacao.nivelPreco++;
          })
        }
      );
    } else {
      this.mostrarDialogNegociacao(
        'Confirmar preço final',
        'Deseja iniciar a negociação com este preço? O outro usuário poderá aceitar ou negociar um outro.',
        () => {
          this.negociaPreco(() => {
            this.negociacao.msgId = id
            this.negociacao.nivelPreco = 1
          })
        }
      )
    }

  }

  public mostrarDialogNegociacao(titulo:string, mensagem: string, callback: Function) {
    const prompt = this.alertCtrl.create({
      title: titulo,
      message: mensagem,
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Confirmar',
          handler: () => {
            callback();
          }
        }
      ]
    });
    prompt.present();
  }

  private async negociaPreco(callback: Function) {
    let url = this.API_URL + "conversas/mensagem";
    this.httpClient
      .put(url, {
        id_mensagem: this.negociacao.msgId,
        nivelPreco: this.negociacao.nivelPreco
      })
      .subscribe(
        success => {
          callback();
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
