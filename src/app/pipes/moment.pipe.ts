//import 'moment/min/locales';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';


@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value);
    console.log(args);
    //moment.locale('pt-br');
    return moment(value, 'YYYY-MM-DD HH:mm:ss').format(args);
  }

}
