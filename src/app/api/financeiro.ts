import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { RequestService } from '../services/request.service';

@Injectable({
  providedIn: 'root',
})
export class FinanceiroApiService {

  pesquisa: string = '';
  pk: string = '';

  constructor(
    private requestService: RequestService,
  ) { }

  getDocumentoFinanceiro(dados) {
    this.pesquisa = dados.pesquisa;
    if (this.pesquisa === '') {
      return this.requestService.get(`${environment.urlApi}/one/financeiro/financeiro-documento`,
        null, true);
    } else {
      if (dados.filtrar) {
        return this.requestService.get(`${environment.urlApi}/one/financeiro/financeiro-documento?${this.pesquisa}`,
          null, true);
      } else {
        return this.requestService.get(`${environment.urlApi}/one/financeiro/financeiro-documento`,
          null, true); // ?pesquisa=${this.pesquisa}
      }
    }
  }

  postDocumentoFinanceiro(dados) {
    return this.requestService.post(`${environment.urlApi}/one/financeiro/financeiro-documento`,
      dados, true);
  }

  putDocumentoFinanceiro(dados) {
    this.pk = dados.pk;
    return this.requestService.put(`${environment.urlApi}/one/financeiro/financeiro-documento?pk=${this.pk}`,
      dados, true);
  }

  delDocumentoFinanceiro(dados) {
    this.pk = dados.pk;
    return this.requestService.delete(`${environment.urlApi}/one/financeiro/financeiro-documento?pk=${this.pk}`,
      dados, true);
  }

  getParcelaFinanceiro(dados) {
    this.pesquisa = dados.financeiro_documento_pk;
    if (this.pesquisa === '') {
      return this.requestService.get(`${environment.urlApi}/one/financeiro/financeiro-parcela`,
        null, true);
    } else {
      return this.requestService.get(`${environment.urlApi}/one/financeiro/financeiro-parcela?financeiro_documento_pk=${this.pesquisa}`,
        null, true);
    }
  }

  postParcelaFinanceiro(dados) {
    return this.requestService.post(`${environment.urlApi}/one/financeiro/financeiro-parcela`,
      dados, true);
  }

  putParcelaFinanceiro(dados) {
    this.pk = dados.pk;
    return this.requestService.put(`${environment.urlApi}/one/financeiro/financeiro-parcela?pk=${this.pk}`,
      dados, true);
  }

  delParcelaFinanceiro(dados) {
    this.pk = dados.pk;
    return this.requestService.delete(`${environment.urlApi}/one/financeiro/financeiro-parcela?pk=${this.pk}`,
      dados, true);
  }

  getTipoDocumentoFinanceiroBuscaAutomatica(dados) {
    this.pesquisa = dados.pesquisa;
    if (this.pesquisa === '') {
      return this.requestService.get(`${environment.urlApi}/one/consultas/consulta-tipo-documento-financeiro-by-nome?nome=%`,
        null, true);
    } else {
      return this.requestService.get(`${environment.urlApi}/one/consultas/consulta-tipo-documento-financeiro-by-nome?nome=${this.pesquisa}`,
        null, true);
    }
  }

  getTipoLojasBuscaAutomatica(dados) {
    this.pesquisa = dados.pesquisa;
    if (this.pesquisa === '') {
      return this.requestService.get(`${environment.urlApi}/one/consultas/consulta-tipo-loja-by-nome?nome=%`,
        null, true);
    } else {
      return this.requestService.get(`${environment.urlApi}/one/consultas/consulta-tipo-loja-by-nome?nome=${this.pesquisa}`,
        null, true);
    }
  }

  getLojasBuscaAutomatica(dados) {
    this.pesquisa = dados.pesquisa;
    if (this.pesquisa === '') {
      return this.requestService.get(`${environment.urlApi}/one/consultas/consulta-loja-by-nome?nome=%`,
        null, true);
    } else {
      return this.requestService.get(`${environment.urlApi}/one/consultas/consulta-loja-by-nome?nome=${this.pesquisa}`,
        null, true);
    }
  }

  getTipoContaCaixaBuscaAutomatica(dados) {
    this.pesquisa = dados.pesquisa;
    if (this.pesquisa === '') {
      return this.requestService.get(`${environment.urlApi}/one/consultas/consulta-plano-conta-by-nome?nome=%&classificacao=3`,
        null, true);
    } else {
      return this.requestService.get(`${environment.urlApi}/one/consultas/consulta-plano-conta-by-nome?nome=${this.pesquisa}&classificacao=3`,
        null, true);
    }
  }

  getProjetosAutomatica(dados) {
    this.pesquisa = dados.pesquisa;
    if (this.pesquisa === '') {
      return this.requestService.get(`${environment.urlApi}/one/consultas/consulta-projeto-by-nome?nome=%`,
        null, true);
    } else {
      return this.requestService.get(`${environment.urlApi}/one/consultas/consulta-projeto-by-nome?nome=${this.pesquisa}`,
        null, true);
    }
  }

  getParceiroNegociosBuscaAutomatica(dados) {
    this.pesquisa = dados.pesquisa;
    if (this.pesquisa === '') {
      return this.requestService.get(`${environment.urlApi}/one/consultas/consulta-pn-by-nome?nome=%`,
        null, true);
    } else {
      return this.requestService.get(`${environment.urlApi}/one/consultas/consulta-pn-by-nome?nome=${this.pesquisa}`,
        null, true);
    }
  }
}