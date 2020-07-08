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
    return this.requestService.get(`${environment.urlApi}/campanha/one/campanhas-perfil`, dados, true);
  }

  metas(dados) {
    return this.requestService.get(`${environment.urlApi}/campanha/one/metas-campanha-perfil`, dados, true);
  }

  imprimirCSV(dados) {
    var codigo_campanha = dados;
    return this.requestService.getDownload(`${environment.urlApi}/campanha/one/metas-campanha-perfil-analitico?codigo_campanha=` + codigo_campanha,
    'text/csv;charset=ANSI', dados, true, 'dashboard-campanha');
  }

}
