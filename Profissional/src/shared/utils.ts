import * as moment from 'moment';

export default class Utils {

  static getDate(data) {
    return moment(data).format('DD/MM/YYYY');
  }

  static getTime(tsp) {
    return moment(tsp).format('hh:MM')
  }
}

