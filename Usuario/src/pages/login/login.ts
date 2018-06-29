import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public modalCtrl: ModalController, private httpClient: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    return new Promise((resolve, reject) => {
      var data = {
        telefone: this.usuario.telefone,
        senha: this.usuario.senha
      };
      let url = this.API_URL + 'usuarios/login';
      this.httpClient.post(url, data).subscribe((result: any) => {
        //resolve(result.json());
        if(result.sucesso == true){
          this.toastCtrl.create({
            message: 'Logado com sucesso',
            duration: 2000,
            position: 'bottom'
          }).present();
          this.navCtrl.setRoot('MainBottomNavigationPage');
          window.localStorage['usuarioId'] = result.id;
        }
      },
      (error) => {
        //reject(error.json());
      });
    });
}

 showHide() {
     this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
     this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
 }

 registrar(){
  let modal = this.modalCtrl.create('RegistroPage');
  modal.present();
 }

}
