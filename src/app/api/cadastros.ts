import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { RequestService } from '../services/request.service';

@Injectable({
  providedIn: 'root',
})
export class CadastrosApiService {

  pesquisa: string = '';
  cpf: string = '';
  pk: string = '';

  constructor(
    private requestService: RequestService,
  ) { }

  /// CADASTRO CLIENTES

  getClientes(dados) {
    this.pesquisa = dados.pesquisa;
    if (this.pesquisa === '') {
      return this.requestService.get(`${environment.urlApi}/cliente-teste-cadastro`,
        null, true);
    } else {
      return this.requestService.get(`${environment.urlApi}/cliente-teste-cadastro?pesquisa=${this.pesquisa}`,
        null, true);
    }
  }

  postClientes(dados) { // Criar Novo Usuario
    return this.requestService.post(`${environment.urlApi}/cliente-teste-cadastro`,
      dados, true);
  }

  putClientes(dados) { // Editar usuário
    return this.requestService.put(`${environment.urlApi}/cliente-teste-cadastro`,
      dados, true);
  }

  delClientes(dados) { // Excluir usuário
    this.cpf = dados.cpf;
    return this.requestService.delete(`${environment.urlApi}/cliente-teste-cadastro?cpf=${this.cpf}`,
      dados, true);
  }

  /// CADASTRO PLANO CONTAS

  getPlanoContas(dados) {
    this.pesquisa = dados.pesquisa;
    if (this.pesquisa === '') {
      return this.requestService.get(`${environment.urlApi}/cadastro-plano-de-contas`,
        null, true);
    } else {
      return this.requestService.get(`${environment.urlApi}/cadastro-plano-de-contas?pesquisa=${this.pesquisa}`,
        null, true);
    }
  }

  postPlanoContas(dados) { // Criar Parceiro negocio
    return this.requestService.post(`${environment.urlApi}/cadastro-plano-de-contas`,
      dados, true);
  }

  putPlanoContas(dados) { // Editar Parceiro negocio
    return this.requestService.put(`${environment.urlApi}/cadastro-plano-de-contas`,
      dados, true);
  }

  delPlanoContas(dados) { // Excluir Parceiro negocio
    this.pk = dados.pk;
    return this.requestService.delete(`${environment.urlApi}/cadastro-plano-de-contas?pk=${this.pk}`,
      dados, true);
  }


  /// CADASTRO PARCEIRO NEGOCIOS

  getParceiroNegocios(dados) {
    this.pesquisa = dados.pesquisa;
    if (this.pesquisa === '') {
      return this.requestService.get(`${environment.urlApi}/cadastro-pn`,
        null, true);
    } else {
      return this.requestService.get(`${environment.urlApi}/cadastro-pn?pesquisa=${this.pesquisa}`,
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

  getCanalVendasBuscaAutomatica(dados) {
    this.pesquisa = dados.pesquisa;
    if (this.pesquisa === '') {
      return this.requestService.get(`${environment.urlApi}/one/consultas/consulta-tipo-canal-venda-by-nome?nome=%`,
        null, true);
    } else {
      return this.requestService.get(`${environment.urlApi}/one/consultas/consulta-tipo-canal-venda-by-nome?nome=${this.pesquisa}`,
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

  postParceiroNegocios(dados) { // Criar Parceiro negocio
    return this.requestService.post(`${environment.urlApi}/cadastro-pn`,
      dados, true);
  }

  putParceiroNegocios(dados) { // Editar Parceiro negocio
    return this.requestService.put(`${environment.urlApi}/cadastro-pn`,
      dados, true);
  }

  delParceiroNegocios(dados) { // Excluir Parceiro negocio
    this.cpf = dados.cpf_cnpj;
    return this.requestService.delete(`${environment.urlApi}/cadastro-pn?cpf_cnpj=${this.cpf}`,
      dados, true);
  }

  /// CADASTRO BANCOS

  getBancos(dados) {
    this.pesquisa = dados.pesquisa;
    if (this.pesquisa === '') {
      return this.requestService.get(`${environment.urlApi}/cadastro-bancos`,
        null, true);
    } else {
      return this.requestService.get(`${environment.urlApi}/cadastro-bancos?pesquisa=${this.pesquisa}`,
        null, true);
    }
  }

  postBancos(dados) { // Criar Bancos
    return this.requestService.post(`${environment.urlApi}/cadastro-bancos`,
      dados, true);
  }

  putBancos(dados) { // Editar Bancos
    return this.requestService.put(`${environment.urlApi}/cadastro-bancos`,
      dados, true);
  }

  delBancos(dados) { // Excluir Bancos
    this.pk = dados.pk;
    return this.requestService.delete(`${environment.urlApi}/cadastro-bancos?pk=${this.pk}`,
      dados, true);
  }

  /// CADASTRO CENTRO DE CUSTOS

  getCentroCustos(dados) {
    this.pesquisa = dados.pesquisa;
    if (this.pesquisa === '') {
      return this.requestService.get(`${environment.urlApi}/cadastro-centro-de-custos`,
        null, true);
    } else {
      return this.requestService.get(`${environment.urlApi}/cadastro-centro-de-custos?pesquisa=${this.pesquisa}`,
        null, true);
    }
  }

  postCentroCustos(dados) { // Criar Bancos
    return this.requestService.post(`${environment.urlApi}/cadastro-centro-de-custos`,
      dados, true);
  }

  putCentroCustos(dados) { // Editar Bancos
    return this.requestService.put(`${environment.urlApi}/cadastro-centro-de-custos`,
      dados, true);
  }

  delCentroCustos(dados) { // Excluir Bancos
    this.pk = dados.pk;
    return this.requestService.delete(`${environment.urlApi}/cadastro-centro-de-custos?pk=${this.pk}`,
      dados, true);
  }

  /// CADASTRO PROJETOS

  getProjetos(dados) {
    this.pesquisa = dados.pesquisa;
    if (this.pesquisa === '') {
      return this.requestService.get(`${environment.urlApi}/cadastro-projetos`,
        null, true);
    } else {
      return this.requestService.get(`${environment.urlApi}/cadastro-projetos?pesquisa=${this.pesquisa}`,
        null, true);
    }
  }

  postProjetos(dados) {
    return this.requestService.post(`${environment.urlApi}/cadastro-projetos`,
      dados, true);
  }

  putProjetos(dados) {
    return this.requestService.put(`${environment.urlApi}/cadastro-projetos`,
      dados, true);
  }

  delProjetos(dados) {
    this.pk = dados.pk;
    return this.requestService.delete(`${environment.urlApi}/cadastro-projetos?pk=${this.pk}`,
      dados, true);
  }

  /// CADASTRO TIPO CONTA CORRENTE

  getTipoContaCorrente(dados) {
    this.pesquisa = dados.pesquisa;
    if (this.pesquisa === '') {
      return this.requestService.get(`${environment.urlApi}/cadastro-tipo-conta-corrente`,
        null, true);
    } else {
      return this.requestService.get(`${environment.urlApi}/cadastro-tipo-conta-corrente?pesquisa=${this.pesquisa}`,
        null, true);
    }
  }

  postTipoContaCorrente(dados) {
    return this.requestService.post(`${environment.urlApi}/cadastro-tipo-conta-corrente`,
      dados, true);
  }

  putTipoContaCorrente(dados) {
    return this.requestService.put(`${environment.urlApi}/cadastro-tipo-conta-corrente`,
      dados, true);
  }

  delTipoContaCorrente(dados) {
    this.pk = dados.pk;
    return this.requestService.delete(`${environment.urlApi}/cadastro-tipo-conta-corrente?pk=${this.pk}`,
      dados, true);
  }

  /// CADASTRO CANAL VENDAS

  getTipoCanalVendas(dados) {
    this.pesquisa = dados.pesquisa;
    if (this.pesquisa === '') {
      return this.requestService.get(`${environment.urlApi}/cadastro-tipo-canal-venda`,
        null, true);
    } else {
      return this.requestService.get(`${environment.urlApi}/cadastro-tipo-canal-venda?pesquisa=${this.pesquisa}`,
        null, true);
    }
  }

  postTipoCanalVendas(dados) {
    return this.requestService.post(`${environment.urlApi}/cadastro-tipo-canal-venda`,
      dados, true);
  }

  putTipoCanalVendas(dados) {
    this.pk = dados.pk;
    return this.requestService.put(`${environment.urlApi}/cadastro-tipo-canal-venda?pk=${this.pk}`,
      dados, true);
  }

  delTipoCanalVendas(dados) {
    this.pk = dados.pk;
    return this.requestService.delete(`${environment.urlApi}/cadastro-tipo-canal-venda?pk=${this.pk}`,
      dados, true);
  }

  /// CADASTRO LOJAS

  getLojas(dados) {
    this.pesquisa = dados.pesquisa;
    if (this.pesquisa === '') {
      return this.requestService.get(`${environment.urlApi}/cadastro-loja`,
        null, true);
    } else {
      return this.requestService.get(`${environment.urlApi}/cadastro-loja?pesquisa=${this.pesquisa}`,
        null, true);
    }
  }

  postLojas(dados) {
    return this.requestService.post(`${environment.urlApi}/cadastro-loja`,
      dados, true);
  }

  putLojas(dados) {
    this.pk = dados.pk;
    return this.requestService.put(`${environment.urlApi}/cadastro-loja?pk=${this.pk}`,
      dados, true);
  }

  delLojas(dados) {
    this.pk = dados.pk;
    return this.requestService.delete(`${environment.urlApi}/cadastro-loja?pk=${this.pk}`,
      dados, true);
  }

  /// CADASTRO TIPO LOJAS

  getTipoLojas(dados) {
    this.pesquisa = dados.pesquisa;
    if (this.pesquisa === '') {
      return this.requestService.get(`${environment.urlApi}/cadastro-tipo-loja`,
        null, true);
    } else {
      return this.requestService.get(`${environment.urlApi}/cadastro-tipo-loja?pesquisa=${this.pesquisa}`,
        null, true);
    }
  }

  postTipoLojas(dados) {
    return this.requestService.post(`${environment.urlApi}/cadastro-tipo-loja`,
      dados, true);
  }

  putTipoLojas(dados) {
    this.pk = dados.pk;
    return this.requestService.put(`${environment.urlApi}/cadastro-tipo-loja?pk=${this.pk}`,
      dados, true);
  }

  delTipoLojas(dados) {
    this.pk = dados.pk;
    return this.requestService.delete(`${environment.urlApi}/cadastro-loja?pk=${this.pk}`,
      dados, true);
  }
}
