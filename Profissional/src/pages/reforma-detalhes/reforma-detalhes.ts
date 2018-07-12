import { Storage } from "@ionic/storage";
import { Component, NgZone } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { HttpClient } from "@angular/common/http";

/**
 * Generated class for the ReformaDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-reforma-detalhes",
  templateUrl: "reforma-detalhes.html"
})
export class ReformaDetalhesPage {
  API_URL: string = "https://minhareforma.herokuapp.com/";
  reforma: any;
  id: any;
  profissional: any;
  reformaLoading: boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpClient: HttpClient,
    public ngZone: NgZone,
    storage: Storage,
    public toastCtrl: ToastController
  ) {
    this.id = navParams.get("id");
    storage.get("profissional").then(val => {
      this.profissional = val;
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ReformaDetalhesPage");
  }
  ionViewWillLoad() {
    console.log(this.reformaLoading);
    this.carregaReformaDetalhe();
  }

  async carregaReformaDetalhe() {
    return await new Promise((resolve, reject) => {
      let url = this.API_URL + "reformas/" + this.id;

      this.httpClient
        .get(url)
        .toPromise()
        .then(
          (result: any) => {
            if (result) {
              this.ngZone.run(() => {
                console.log(result);
                this.reforma = result;
                this.reformaLoading = false;
              });
            }
            // resolve(result.json());
          },
          error => {
            // reject(error.json());
          }
        );
    });
  }

  async registrarInteresse() {
    let url = this.API_URL + "reformas/profissionais";
    let dados = {
      id_reforma: this.reforma.id,
      id_profissional: this.profissional
    };
    this.httpClient.post(url, dados).subscribe(
      data => {
        this.toastCtrl
          .create({
            message: "Solicitação enviada com sucesso!",
            duration: 2000,
            position: "bottom"
          })
          .present();
      },
      error => {}
    );
  }
}
