import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import Utils from '../../shared/utils'


@IonicPage()
@Component({
  selector: 'page-reforma-detalhes',
  templateUrl: 'reforma-detalhes.html',
})
export class ReformaDetalhesPage {

  API_URL: string = "https://minhareforma.herokuapp.com/";
  reforma:any;
  id:any;
  reformaLoading: boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpClient: HttpClient,
    public ngZone: NgZone,
    public actionSheetCtrl: ActionSheetController
  ) {
    this.id = navParams.get("id");
  }

  ionViewDidLoad() {}
  ionViewWillLoad(){
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

  public abrirModalProfissional(title: string){
    const actionSheet = this.actionSheetCtrl.create({
      title: title,
      buttons: [
        {
          text: 'Aceitar profissional',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Abrir chat',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Ver perfil',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Voltar',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public getDate(data) {
    return Utils.getDate(data);
  }

}
