import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  API_URL: string = "https://minhareforma.herokuapp.com/";
  usuario = { telefone: "", senha: ""};
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  user: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public modalCtrl: ModalController, public httpClient: HttpClient, private storage: Storage) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login(){
    return new Promise((resolve, reject) => {
      var data = {
        telefone: this.usuario.telefone,
        senha: this.usuario.senha,
        tipoPessoa: 'profissional'
      };
      let url = this.API_URL + 'login';
      this.httpClient.post(url, data).toPromise()
      .then(
        (result: any) => {
          console.log(result);
        this.toastCtrl.create({
          message: 'Logado com sucesso',
          duration: 2000,
          position: 'bottom'
        }).present();
        this.storage.set('usuario',result.id_usuario);
        this.storage.set('pessoa',result.id_pessoa);
        this.storage.set('profissional',result.id_perfil);
        this.navCtrl.setRoot('MainBottomNavigationPage');
      },
      (error) => {
        this.toastCtrl.create({
          message: error.error.tipo ? error.error.tipo : 'Ocorreu um erro ao validar o login. Tente novamente.',
          duration: 2000,
          position: 'bottom'
        }).present();
      })
      .catch(() => {
        console.error('Errou');

      });
    });
}
    // if(this.usuario.telefone == "123" && this.usuario.senha == "123"){
    //   this.navCtrl.setRoot('HomePage', { 'telefone':this.usuario.telefone});
    // }else{

    // }


 showHide() {
     this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
     this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
 }

 registrar(){
  let modal = this.modalCtrl.create('RegistroPage');
  modal.present();
 }

}
