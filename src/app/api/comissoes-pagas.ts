import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { RequestService } from '../services/request.service';

@Injectable({
  providedIn: 'root'
})
export class ComissoesPagasApiService {

  constructor(
    private requestService: RequestService,
  ) { }

  ComissoesPagasSintetico(dados) {
    return this.requestService.get(`${environment.urlApi}/comissoes-pagas-sintetico`, dados, true);
  }

  ComissoesPagasAnalitico(dados = {}) {
    return this.requestService.get(`${environment.urlApi}/comissoes-pagas-analitico`, dados, true);
  }

}