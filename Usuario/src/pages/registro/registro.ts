import { HttpClient } from "@angular/common/http";
import { Component, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonicPage, NavController, ToastController } from "ionic-angular";
import { Usuario } from "../../model/usuario.model";


@IonicPage()
@Component({
  selector: "page-registro",
  templateUrl: "registro.html"
})
export class RegistroPage {
  @ViewChild("registroSlider") registroSlider: any;

  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;

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

  next() {
    this.registroSlider.slideNext();
  }

  prev() {
    this.registroSlider.slidePrev();
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

      this.httpClient.post(url, usuario).subscribe(
        (result: any) => {
          console.log(result);
          console.log(result.sucesso);
          if(result.sucesso == true){
            this.toastCtrl.create({
              message: 'User was added successfully',
              duration: 1500,
              position: 'bottom'
            }).present();
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

  closeModal() {
    this.navCtrl.pop();
  }
}
