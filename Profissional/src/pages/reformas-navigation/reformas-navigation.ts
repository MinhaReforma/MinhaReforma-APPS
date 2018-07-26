import { Status } from "./../../model/enum/status.enum";
import { Storage } from "@ionic/storage";
import { Component, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  ActionSheetController
} from "ionic-angular";
import Utils from "../../shared/utils";

@IonicPage()
@Component({
  selector: "page-reformas-navigation",
  templateUrl: "reformas-navigation.html"
})
export class ReformasNavigationPage {
  showNone: boolean = true;
  tiposReformas: string;
  id: number;
  reformas: any = [];
  API_URL: string = Utils.getApi();
  reformaNegociacao: any = [];
  reformaAndamento: any = [];
  reformaConcluida: any = [];
  reformaNova: any = [];
  showNoneAndamento: boolean = true;
  showNoneConcluido: boolean = true;
  showNoneNegociacao: boolean = true;
  showNoneNova: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public httpClient: HttpClient,
    public actionSheetCtrl: ActionSheetController,
    private storage: Storage
  ) {
    this.storage.get("profissional").then(val => {
      this.id = val;
      this.carregaReformasProfissional();
    });
    this.tiposReformas = "minhas";
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.carregaReformas();
    }, 500);
  }

  abrirDetalhes(ref) {
    this.navCtrl.push("ReformaDetalhesPage", { id: ref.id });
  }

  async carregaReformas() {
    let url = this.API_URL + "reformas/novo";
    this.reformaNegociacao = [];
    this.reformaNova = [];
    this.httpClient.get(url).subscribe(
      (result: any) => {
        if (result.sucesso) {
          for (let ref of result.reformas) {
            let flag = false;
            if (ref.listaProfissionais.length > 0) {
              for (let prof of ref.listaProfissionais) {
                if (this.id == prof.id) {
                  flag = true;
                  this.reformaNegociacao.push(ref);
                  console.log("negociacao")
                }
              }
            }
            if (!flag) {
              this.reformaNova.push(ref);
            }
          }
        }
        if (this.reformaNova.length > 0) {
          this.showNoneNova = false;
        }
        if (this.reformaNegociacao.length > 0) {
          this.showNoneNegociacao = false;
        }
      },
      error => {}
    );
  }

  carregaReformasProfissional() {
    let url = this.API_URL + "reformas/" + "profissional/" + this.id;
    this.httpClient.get(url).subscribe(
      (result: any) => {
        if (result.sucesso) {
          this.reformaAndamento = result.reformas.filter(element => {
            return element.status == Status.ANDAMENTO;
          });
          this.reformaConcluida = result.reformas.filter(element => {
            return element.status == Status.CONCLUIDO;
          });
          if (this.reformas.length > 0) {
            this.showNone = false;
          }
          if (this.reformaAndamento.length > 0) {
            this.showNoneAndamento = false;
          }
          if (this.reformaConcluida.length > 0) {
            this.showNoneConcluido = false;
          }
          console.log(this.reformaConcluida);

          this.storage.set('quantidadeReformas', this.reformaConcluida.length);
        }
      },
      error => {}
    );
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
