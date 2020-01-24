import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { RequestService } from '../services/request.service';

@Injectable({
  providedIn: 'root'
})
export class IndiceContratosDigitadosApiService {

  constructor(
    private requestService: RequestService,
  ) { }

  pagos(dados) {
    return this.requestService.post(`${environment.urlApi}/indice-contratos-digitados-pagos`, dados, true);
  }

  sintetico(dados = {}) {
    return this.requestService.post(`${environment.urlApi}/indice-contratos-digitados-pagos-sintetico`, dados, true);
  }

}
