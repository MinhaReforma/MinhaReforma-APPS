import { Reforma } from "./../../model/reforma.model";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Storage } from "@ionic/storage";
import Utils from '../../shared/utils';

@IonicPage()
@Component({
  selector: "page-criareforma",
  templateUrl: "criareforma.html"
})
export class CriaReformaPage {
  API_URL: string = Utils.getApi();
  input = { nome: "", descricao: "" };
  id: number;
  formgroup: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpClient: HttpClient,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public storage: Storage
  ) {
    this.storage.get("cliente").then(val => {
      this.id = val;
    });

    this.formgroup = formBuilder.group({
      nome: [
        "",
        Validators.compose([Validators.required, Validators.pattern('.*[^s]')])
      ],
      descricao: [
        "",
        Validators.compose([Validators.required, Validators.minLength(10)])
      ]
    });
  }

  closeModal() {
    this.navCtrl.pop();
  }

  criarReforma() {
    if (this.formgroup.invalid) {
      return;
    }
    return new Promise((resolve, reject) => {
      let url = this.API_URL + "reformas";
      this.httpClient
        .post(url, new Reforma(this.id, this.formgroup.value.nome, this.formgroup.value.descricao))
        .subscribe(
          (result: any) => {
            if (result.sucesso == true) {
              this.toastCtrl
                .create({
                  message: result.mensagem,
                  duration: 1500,
                  position: "bottom"
                })
                .present();
              this.navCtrl.pop();
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
