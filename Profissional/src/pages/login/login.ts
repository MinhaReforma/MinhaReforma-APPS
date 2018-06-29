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
      return await new Promise((resolve, reject) => {
        var data = {
          telefone: this.usuario.telefone,
          senha: this.usuario.senha
        };
        let url = this.API_URL + 'usuarios/login';
    this.httpClient.post(url, data).subscribe((result: any) => {
      //resolve(result.json());
      console.log(result);
      if(result){
        this.toastCtrl.create({
          message: 'resultado',
          duration: 1000,
          position: 'bottom'
        }).present();
      }
      if(result.sucesso == true){
        this.toastCtrl.create({
          message: 'Logado com Sucesso',
          duration: 1500,
          position: 'bottom'
        }).present();
        this.storage.set('usuario',result.id);
        this.navCtrl.setRoot('MainBottomNavigationPage');
      }
    },
    (error) => {
      //reject(error.json());
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
