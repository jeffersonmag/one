import { Pipe, PipeTransform } from '@angular/core';
import { number_format } from 'locutus/php/strings';


@Pipe({
  name: 'moeda'
})
export class MoedaPipe implements PipeTransform {

  transform(value: any): any {
    return number_format(Number(value), 2, ',', '.');
  }

}
