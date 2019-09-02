import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { RequestService } from '../services/request.service';

@Injectable({
  providedIn: 'root'
})
export class PendenciaFisicoApiService {

  constructor(
    private requestService: RequestService,
  ) { }

  perfil(dados = {}) {
    return this.requestService.get(`${environment.urlApi}/resumo-pendencia-fisico-analitico-perfil`, dados, true);
  }
  pendencias(dados = {}) {
    return this.requestService.post(`${environment.urlApi}/resumo-pendencia-fisico-analitico-perfil`, dados, true);
  }

}
