import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ToastController
} from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import Utils from "../../shared/utils";
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: "page-avaliacoes-lista",
  templateUrl: "avaliacoes-lista.html"
})
export class AvaliacoesListaPage {
  API_URL: string = Utils.getApi();
  id: any;
  div: any;
  profissionais: any;
  reforma: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public httpClient: HttpClient,
    public toastCtrl: ToastController,
    public storage: Storage
  ) {
    this.reforma = navParams.get("reforma");
    this.storage.get("cliente").then(val => {
      this.id = val;
    });
    this.storage.get("profissionaisParaAvaliacao").then(val => {
      this.profissionais = val;
    });
  }

  darNota(nota, prof, event) {
    if (event.target.style.color != "rgb(227, 178, 60)") {
      this.div = event.target.parentElement;

      const prompt = this.alertCtrl.create({
        title: "Escreva um comentário",
        message:
          "Caso deseje, escreva um comentário contando um pouco o porquê dessa nota " +
          nota +
          " para o prestador",
        inputs: [
          {
            name: "mensagem",
            placeholder: "Digite um comentário (opcional)"
          }
        ],
        buttons: [
          {
            text: "Cancelar"
          },
          {
            text: "Enviar",
            handler: data => {
              this.enviaAvaliacao(prof.id, nota, data.mensagem);
            }
          }
        ]
      });
      prompt.present();
    }
  }

  private enviaAvaliacao(idProf, nota, mensagem) {
    return new Promise((resolve, reject) => {
      let url = this.API_URL + "avaliacao";
      this.httpClient
        .post(url, {
          id_avaliador: this.id,
          id_avaliado: idProf,
          id_reforma: this.reforma,
          mensagem: mensagem,
          nota: nota,
          tipo: "cliente"
        })
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
              for (let elem of this.div.children) {
                console.log(elem);

                if (elem.id <= nota) {
                  elem.style.color = "#E3B23C";
                }
              }
            }
          },
          error => {}
        );
    });
  }

  closeModal() {
    this.navCtrl.pop();
  }
}
