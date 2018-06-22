import { Atuacao } from './enum/atuacao.enum';
import { Habilidade } from './enum/habilidade.enum';

export class Profissional {
  public id: number;
  public idPessoa: number;
  public idUsuario: number;
  public cpf: string;
  public nome: string;
  public carteira: {}//criar model carteira
  public foto: {}//criar model foto
  listaHabilidaes: Habilidade[];
  areaAtuacao: Atuacao[]
}
