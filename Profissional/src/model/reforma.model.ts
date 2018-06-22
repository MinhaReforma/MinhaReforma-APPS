import { Cliente } from './cliente.model';
import { Profissional } from './profissional.model';
import { Status } from './enum/status.enum';

export class Reforma {
  public id: number;
  public cliente: Cliente;
  public dataInicio: Date;
  public nome: string;
  public descricao: string;
  public listaFotos: {}// criar model Fotos[];;
  public listaProfissionais: Profissional[];
  public profissional: Profissional;
  public status: Status;
  public preco: number;
  public pagamentos: {}// criar model Pagamento[];
}
