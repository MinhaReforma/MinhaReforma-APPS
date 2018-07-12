import * as moment from 'moment';

export default class Utils {
  static getDate(data) {
    return moment(data).format('dd/mm/YYYY');
  }
}

