import { Status } from "./../../model/enum/status.enum";
import { Storage } from "@ionic/storage";
import { Component, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  IonicPage,
  ModalController,
  NavController,
  NavParams
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
  API_URL: string = "https://minhareforma.herokuapp.com/";
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
    storage: Storage
  ) {
    storage.get("profissional").then(val => {
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
    let url = this.API_URL + "reformas";
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
              console.log("nova")
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
        }
      },
      error => {}
    );
  }

  public getDate(data) {
    return Utils.getDate(data);
  }
}
