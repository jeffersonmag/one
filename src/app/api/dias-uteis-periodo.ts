import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { RequestService } from '../services/request.service';

@Injectable({
  providedIn: 'root'
})
export class DiasUteisPeriodoApiService {

  constructor(
    private requestService: RequestService,
  ) { }

  periodo(dados) {
    return this.requestService.post(`${environment.urlApi}/dias-uteis-periodo`, dados, true);
  }

}
