import * as moment from 'moment';

export default class Utils {

  private static API_URL: string = "https://minhareforma.herokuapp.com/";

  public static getApi(){
    return this.API_URL;
  }

  static getDate(data) {
    return moment(data).format('DD/MM/YYYY');
  }
}

