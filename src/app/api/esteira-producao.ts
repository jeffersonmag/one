import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { RequestService } from '../services/request.service';

@Injectable({
  providedIn: 'root'
})
export class EsteiraProducaoApiService {

  cpf: string;

  constructor(
    private requestService: RequestService,
  ) { }

  indicadores(dados = {}) {
    return this.requestService.post(`${environment.urlApi}/indicadores-propostas-por-status-agrupado-inconsistencia`, dados, true);
  }

  propostasInconsistentes(dados = {}) {
    return this.requestService.post(`${environment.urlApi}/propostas-inconsistentes-analitico`, dados, true);
  }

  drillDown(dados) {
    this.cpf = dados.cpf_cliente;
    return this.requestService.get(`${environment.urlApi}/drilldown-base-historica-contratos-por-cliente/${this.cpf}`, null, true);
  }

  listarAcoesPredefinidas() {
    return this.requestService.get(`${environment.urlApi}/lista-acoes-predefinidas-inconsistencia`, null, true);
  }

  resolveInconsistenciaAcao(dados) {
    return this.requestService.put(`${environment.urlApi}/resolve-inconsistencia-com-acao-predifinida`, dados, true);
  }

}