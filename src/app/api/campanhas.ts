import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { RequestService } from '../services/request.service';

@Injectable({
  providedIn: 'root'
})
export class CampanhasApiService {

  constructor(
    private requestService: RequestService,
  ) { }

  perfil(dados = {}) {
    return this.requestService.get(`${environment.urlApi}/campanhas-perfil`, dados, true);
  }

  metas(dados) {
    return this.requestService.post(`${environment.urlApi}/campanha/one/metas-campanha-perfil`, dados, true);
  }

}
