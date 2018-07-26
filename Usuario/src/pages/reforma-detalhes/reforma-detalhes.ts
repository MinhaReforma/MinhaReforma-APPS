import { HttpClient } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import { ActionSheetController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import Utils from '../../shared/utils';
import { Status } from '../../model/enum/status.enum';


@IonicPage()
@Component({
  selector: 'page-reforma-detalhes',
  templateUrl: 'reforma-detalhes.html',
})
export class ReformaDetalhesPage {

  abaAtiva: string;
  API_URL: string = Utils.getApi();
  reforma:any;
  id:any;
  reformaLoading: boolean = true;
  actionSheet: any;
  textos: any = {
    profissionaisHeader: '',
    precoHeader: '',
  }
  public exibirBotao: any = {
    concluir: false,
    andamento: false
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpClient: HttpClient,
    public ngZone: NgZone,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController
  ) {
    this.id = navParams.get("id");
    this.textos.profissionalHeader = 'Profissionais que aplicaram';
    this.textos.precoHeader = 'Orçamento inicial'
  }

  ionViewDidLoad() {}
  ionViewWillLoad(){
    this.abaAtiva = 'detalhes';
    this.carregaReformaDetalhe();
  }

  async carregaReformaDetalhe(){
    return await new Promise((resolve, reject) => {
      let url = this.API_URL + "reformas/" + this.id;

      this.httpClient.get(url).subscribe(
        (result: any) => {
          if(result){
            this.ngZone.run(()=>{
              this.reforma = result;
              if (result.status == Status.NOVO && result.listaProfissionaisAceitos.length > 0) {
                this.exibirBotao.andamento = true;
              } else if(result.status == Status.ANDAMENTO){
                this.exibirBotao.concluir = true;
                this.textos.profissionalHeader = "Profissionais Contratados";
                this.textos.precoHeader = 'Preço final'
              } else {
                this.textos.precoHeader = 'Preço final'
              }
              this.reformaLoading = false;
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

  public abrirModalProfissional(profissional: any){
    let options = [
      {
        text: 'Aceitar profissional',
        cssClass: 'primaria',
        role: 'destructive',
        handler: () => {
          this.aceitaProfissional(profissional);
        }
      },{
        text: 'Abrir chat',
        handler: () => {
          this.navCtrl.push('ChatReformaPage',{"idProfissional": profissional.id, "id": this.id})
        }
      },{
        text: 'Ver perfil',
        handler: () => {
          this.navCtrl.push('PerfilProfissionalPage',{"profissional": profissional.id})
        }
      },{
        text: 'Voltar',
        cssClass: 'dismiss',
        role: 'cancel'
      }
    ];

    if(this.reforma.status != Status.NOVO
      || profissional.preco == 0 || this.reforma.listaProfissionaisAceitos.indexOf(profissional.id) >= 0){
      options = options.slice(1);
    }
    this.actionSheet = this.actionSheetCtrl.create({
      title: profissional.nome,
      buttons: options
    });
    this.actionSheet.present();
  }

  aceitaProfissional(profissional) {
    let url = this.API_URL + "reformas/profissional";
    this.httpClient.put(url,{id_reforma: this.id, id_profissional: profissional.id, status: 'aceito'}).subscribe(
      data => {
        this.toastCtrl
          .create({
            message: profissional.nome + " participará desta reforma",
            duration: 2000,
            position: "bottom"
          })
          .present();

      },
      err => {}
    );
  }

  reformaAndamento() {
    let url = this.API_URL +"reformas/status";
    this.httpClient.put(url,{id_reforma: this.id, status: Status.ANDAMENTO}).subscribe(
      data => {
        this.toastCtrl
          .create({
            message: "Sua reforma está em Andamento!",
            duration: 2000,
            position: "bottom"
          })
          .present();
          this.exibirBotao.andamento = false;

      },
      err => {}
    );
  }

  reformaConcluida() {
    let url = this.API_URL +"reformas/status";
    this.httpClient.put(url,{id_reforma: this.id, status: Status.CONCLUIDO}).subscribe(
      data => {
        this.toastCtrl
          .create({
            message: "Sua reforma está Concluida!",
            duration: 2000,
            position: "bottom"
          })
          .present();
          this.exibirBotao.concluir = false;
      },
      err => {}
    );
  }



  public getDate(data) {
    return Utils.getDate(data);
  }

}
