import { Injectable } from '@angular/core';
import { RequestService } from '../services/request.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private requestService: RequestService) { }

  getHeadereDiasUteis() {
    return this.requestService.get(`${environment.urlApi}/toten-producao//toten-producao/dias-uteis`, null, true);
  }

  getHeadereDiasUteisRestantes() {
    return this.requestService.get(`${environment.urlApi}/toten-producao//toten-producao/dias-uteis-restante`, null, true);
  }

  getHeaderMetaTotal() {
    return this.requestService.get(`${environment.urlApi}/toten-producao//toten-producao/meta-total-sintetica`, null, true);
  }

  getHeaderMetaRealizada() {
    return this.requestService.get(`${environment.urlApi}/toten-producao/meta-realizada`, null, true);
  }

  getHeaderMetaProjetada() {
    return this.requestService.get(`${environment.urlApi}/toten-producao/meta-projetada`, null, true);
  }

  getHeaderMetaDiaria() {
    return this.requestService.get(`${environment.urlApi}/toten-producao/meta-diaria`, null, true);
  }

  getHeaderMetaRecalculada() {
    return this.requestService.get(`${environment.urlApi}/toten-producao/meta-recalculada`, null, true);
  }

  getHeaderQuantidadePropostas() {
    return this.requestService.get(`${environment.urlApi}/toten-producao/quantidade-propostas`, null, true);
  }

  getApelidoInstituicao() {
    return this.requestService.get(`${environment.urlApi}/toten-producao/apelido-instituicao`, null, true);
  }

  getLoja() {
    return this.requestService.get(`${environment.urlApi}/toten-producao/loja`, null, true);
  }

  getRegional() {
    return this.requestService.get(`${environment.urlApi}/toten-producao/regional`, null, true);
  }

  getComercial() {
    return this.requestService.get(`${environment.urlApi}/toten-producao/comercial`, null, true);
  }

  getStatus() {
    return this.requestService.get(`${environment.urlApi}/toten-producao/status`, null, true);
  }

  getInstituicao() {
    return this.requestService.get(`${environment.urlApi}/toten-producao/instituicao`, null, true);
  }

  getProdutoCorban() {
    return this.requestService.get(`${environment.urlApi}/toten-producao/produto-corban`, null, true);
  }

  getTipoFormalizacao() {
    return this.requestService.get(`${environment.urlApi}/toten-producao/tipo-formalizacao`, null, true);
  }

  getTipoOperacao() {
    return this.requestService.get(`${environment.urlApi}/toten-producao/tipo-operacao`, null, true);
  }
}
