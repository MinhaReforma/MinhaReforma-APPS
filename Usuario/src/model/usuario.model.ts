export class Usuario {
  public id: number;
  public telefone: string;
  public senha: string;

  constructor(telefone:string, senha:string){
    this.telefone = telefone;
    this.senha = senha;
  }
}
