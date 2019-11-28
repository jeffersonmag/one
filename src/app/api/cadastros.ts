import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { RequestService } from '../services/request.service';

@Injectable({
  providedIn: 'root'
})
export class CadastrosApiService {

  pesquisa: string = "";

  constructor(
    private requestService: RequestService,
  ) { }

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
}