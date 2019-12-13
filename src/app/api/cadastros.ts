import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { RequestService } from '../services/request.service';

@Injectable({
  providedIn: 'root'
})
export class CadastrosApiService {

  pesquisa: string = '';
  cpf: string = '';
  pk: string = '';

  constructor(
    private requestService: RequestService,
  ) { }

  ///CADASTRO CLIENTES

  getClientes(dados) {
    this.pesquisa = dados.pesquisa;
    if (this.pesquisa == "") {
      return this.requestService.get(`${environment.urlApi}/cliente-teste-cadastro`,
        null, true);
    } else {
      return this.requestService.get(`${environment.urlApi}/cliente-teste-cadastro?pesquisa=${this.pesquisa}`,
        null, true);
    }
  }

  postClientes(dados) { //Criar Novo Usuario
    return this.requestService.post(`${environment.urlApi}/cliente-teste-cadastro`,
      dados, true);
  }

  putClientes(dados) { //Editar usuário
    return this.requestService.put(`${environment.urlApi}/cliente-teste-cadastro`,
      dados, true);
  }

  delClientes(dados) { //Excluir usuário
    this.cpf = dados.cpf;
    return this.requestService.delete(`${environment.urlApi}/cliente-teste-cadastro?cpf=${this.cpf}`,
      dados, true);
  }

  ///CADASTRO PARCEIRO NEGOCIOS

  getParceiroNegocios(dados) {
    this.pesquisa = dados.pesquisa;
    if (this.pesquisa == "") {
      return this.requestService.get(`${environment.urlApi}/cadastro-pn`,
        null, true);
    } else {
      return this.requestService.get(`${environment.urlApi}/cadastro-pn?pesquisa=${this.pesquisa}`,
        null, true);
    }
  }

  postParceiroNegocios(dados) { //Criar Parceiro negocio
    return this.requestService.post(`${environment.urlApi}/cadastro-pn`,
      dados, true);
  }

  putParceiroNegocios(dados) { //Editar Parceiro negocio
    return this.requestService.put(`${environment.urlApi}/cadastro-pn`,
      dados, true);
  }

  delParceiroNegocios(dados) { //Excluir Parceiro negocio
    this.cpf = dados.cpf_cnpj;
    return this.requestService.delete(`${environment.urlApi}/cadastro-pn?cpf_cnpj=${this.cpf}`,
      dados, true);
  }

  ///CADASTRO BANCOS

  getBancos(dados) {
    this.pesquisa = dados.pesquisa;
    if (this.pesquisa == "") {
      return this.requestService.get(`${environment.urlApi}/cadastro-bancos`,
        null, true);
    } else {
      return this.requestService.get(`${environment.urlApi}/cadastro-bancos?pesquisa=${this.pesquisa}`,
        null, true);
    }
  }

  postBancos(dados) { //Criar Bancos
    return this.requestService.post(`${environment.urlApi}/cadastro-bancos`,
      dados, true);
  }

  putBancos(dados) { //Editar Bancos
    return this.requestService.put(`${environment.urlApi}/cadastro-bancos`,
      dados, true);
  }

  delBancos(dados) { //Excluir Bancos
    this.pk = dados.pk;
    return this.requestService.delete(`${environment.urlApi}/cadastro-bancos?pk=${this.pk}`,
      dados, true);
  }
}
