import { HttpClient } from "@angular/common/http";
import { Component, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonicPage, NavController, ToastController } from "ionic-angular";


@IonicPage()
@Component({
  selector: "page-registro",
  templateUrl: "registro.html"
})
export class RegistroPage {
  @ViewChild("registroSlider") registroSlider: any;

  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;
  isFirst: boolean = true;
  isLast: boolean = false;

  submitAttempt: boolean = false;
  API_URL: string = "https://minhareforma.herokuapp.com/";
  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public httpClient: HttpClient,
    public toastCtrl: ToastController
  ) {
    this.slideOneForm = formBuilder.group({
      firstName: [
        "",
        Validators.compose([
          Validators.maxLength(30),
          Validators.pattern("[a-zA-Z ]*"),
          Validators.required
        ])
      ],
      lastName: [
        "",
        Validators.compose([
          Validators.maxLength(30),
          Validators.pattern("[a-zA-Z ]*"),
          Validators.required
        ])
      ],
      cpf: [
        "",
        Validators.compose([Validators.required, Validators.pattern("[0-9]*")])
      ]
    });

    this.slideTwoForm = formBuilder.group({
      telefone: [
        "",
        Validators.compose([Validators.required, Validators.pattern("[0-9]*")])
      ],
      senha: [
        "",
        Validators.compose([Validators.required, Validators.minLength(4)])
      ]
      //senha2: ['',  Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  }

  ionViewDidLoad(){
    // this.registroSlider.lockSwipes(true);
  }

  next() {
    this.registroSlider.slideNext();
    console.log(this.registroSlider.getActiveIndex())
    this.isFirst = false;
    if(this.registroSlider.isEnd()){
      this.isLast = true;
    }
  }

  prev() {
    this.registroSlider.slidePrev();
    this.isLast = false;
    if(this.registroSlider.isBeginning()){
      this.isFirst = true;
    }
  }

  async save() {
    if (this.slideOneForm.invalid){
      this.prev();
      return
    } else if (this.slideTwoForm.invalid){
      return;
    }
    var usuario = {"telefone": this.slideTwoForm.value.telefone, "senha": this.slideTwoForm.value.senha,
     "cpf": this.slideOneForm.value.cpf, "nome": this.slideOneForm.value.firstName +" "+this.slideOneForm.value.lastName };
    return await new Promise((resolve, reject) => {
      let url = this.API_URL + "clientes";

      this.httpClient.post(url, usuario).toPromise()
      .then(
        (result: any) => {
          console.log(result);
            this.toastCtrl.create({
              message: result.mensagem,
              duration: 1500,
              position: 'bottom'
            }).present();
            this.navCtrl.pop();
        },
        error => {
          this.toastCtrl.create({
            message: error.error.mensagem,
            duration: 1500,
            position: 'bottom'
          }).present();
        }
      );
    });
  }

  closeModal() {
    this.navCtrl.pop();
  }
}
