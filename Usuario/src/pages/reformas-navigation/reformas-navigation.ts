import { Status } from './../../model/enum/status.enum';
import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage, ModalController, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import Utils from '../../shared/utils'
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-reformas-navigation',
  templateUrl: 'reformas-navigation.html',
})
export class ReformasNavigationPage {
  showNone: boolean = true;
  showNoneExec: boolean = true;
  tiposReformas:string;
  id: number;
  reformas:any = [];
  API_URL: string = "https://minhareforma.herokuapp.com/";
  idCliente: any;
  reformasNovo: any = [];
  reformaAndamento: any = [];
  reformasConcluida: any = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public httpClient: HttpClient, public actionSheetCtrl: ActionSheetController, private storage: Storage) {
    this.storage.get('cliente').then((val)=>{
      this.idCliente = val;
      this.carregaReformas();
    })
    this.tiposReformas = 'minhas';
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.carregaReformas();
    }, 500);
  }

  criarReforma(){
    let modal = this.modalCtrl.create('CriaReformaPage', {"id":this.id});
    modal.onDidDismiss(data => {
      this.carregaReformas();
    });
    modal.present();


  }

  abrirDetalhes(ref){
    this.navCtrl.push("ReformaDetalhesPage", {"id": ref.id});
  }

  async carregaReformas(){
    return await new Promise((resolve, reject) => {
      let url = this.API_URL + "reformas/cliente/" + this.idCliente;

      this.httpClient.get(url).subscribe(
        (result: any) => {
          if(result.sucesso){
            this.reformasNovo = result.reformas.filter((element) => {return element.status == Status.NOVO});
            this.reformaAndamento = result.reformas.filter((element) => {return element.status == Status.ANDAMENTO});
            this.reformasConcluida = result.reformas.filter((element) => {return element.status == Status.CONCLUIDO});
            if (this.reformasNovo.length > 0) {
              this.showNone = false;
            }
            if (this.reformaAndamento.length > 0) {
              this.showNoneExec = false;
            }
          }
        },
        error => {

        }
      );
    });
  }

  public getDate(data) {
    return Utils.getDate(data);
  }

  public mostraOpcoes(e, id) {
    e.stopPropagation();
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Opções',
      buttons: [
        {
          text: 'Editar',
          handler: () => {
            console.log('editar');
          }
        },{
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            console.log('Excluir');
          }
        },{
          text: 'Voltar',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

}
