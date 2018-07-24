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
  public showButton: boolean = false;
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
              if(result.status == Status.ANDAMENTO){
                this.showButton = true;
                this.textos.profissionalHeader = "Profissionais Contratados";
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
          this.reformaAndamento();
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

    if(this.reforma.status != Status.NOVO || profissional.preco == 0){
      options = options.slice(1);
    }
    this.actionSheet = this.actionSheetCtrl.create({
      title: profissional.nome,
      buttons: options
    });
    this.actionSheet.present();
  }

  reformaAndamento() {

    let url = this.API_URL +"reformas/status";
    this.httpClient.post(url,{reforma: this.id, status: Status.ANDAMENTO}).subscribe(
      data => {
        this.toastCtrl
          .create({
            message: "Sua reforma está em Andamento!",
            duration: 2000,
            position: "bottom"
          })
          .present();

      },
      err => {}
    );
  }

  reformaConcluida() {

    let url = this.API_URL +"reformas/status";
    this.httpClient.post(url,{reforma: this.id, status: Status.CONCLUIDO}).subscribe(
      data => {
        this.toastCtrl
          .create({
            message: "Sua reforma está Concluida!",
            duration: 2000,
            position: "bottom"
          })
          .present();
          this.actionSheet.dismiss();

      },
      err => {}
    );
  }



  public getDate(data) {
    return Utils.getDate(data);
  }

}
