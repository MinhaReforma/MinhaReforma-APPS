import { Storage } from "@ionic/storage";
import { Component, NgZone } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController, ModalController
} from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import Utils from "../../shared/utils";


@IonicPage()
@Component({
  selector: "page-reforma-detalhes",
  templateUrl: "reforma-detalhes.html"
})
export class ReformaDetalhesPage {
  API_URL: string = Utils.getApi();
  reforma: any;
  id: any;
  profissional: any;
  reformaLoading: boolean = true;
  showButton: boolean = true;
  precoOrcamento: number;
  avaliado: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpClient: HttpClient,
    public ngZone: NgZone,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public storage: Storage
  ) {
    this.id = navParams.get("id");
    this.avaliado = navParams.get('avaliacao');
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
                for(let prof of result.listaProfissionais){
                  if(this.profissional == prof.id){
                    this.showButton = false;
                    this.precoOrcamento = prof.preco;
                  }
                }
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
    let url = this.API_URL + "reformas/profissional";
    let dados = {
      id_reforma: this.reforma.id,
      id_profissional: this.profissional
    };
    this.httpClient.post(url, dados).subscribe(
      data => {
        this.carregaReformaDetalhe()
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

  public abriChat(){
    this.navCtrl.push('ChatReformaPage',{"idProfissional": this.profissional, "id":this.id});
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  public getDate(data) {
    return Utils.getDate(data);
  }

  public avaliarSolicitante() {
    this.storage.set('idClienteAvaliar', this.reforma.cliente.id)
    let modal = this.modalCtrl.create('AvaliarClientePage', {reforma: this.reforma.id});
    modal.present();
  }
}
