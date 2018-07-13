import { Profissional } from './profissional.model';
import { Status } from './enum/status.enum';

export class Reforma {
  public id: number;
  public id_cliente: number;
  public datainicio: number;
  public nome: string;
  public descricao: string;
  public listaFotos: {}// criar model Fotos[];;
  public listaProfissionais: Profissional[];
  public profissional: Profissional;
  public status: Status;
  public preco: number;
  public pagamentos: {}// criar model Pagamento[];

  constructor(cliente: number, nome: string, descricao: string){
    this.id_cliente = cliente;
    this.nome = nome;
    this.descricao = descricao;
    this.datainicio = + new Date();
    this.status = Status.NOVO;

  }
}
