import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RequestService } from '../services/request.service';

@Injectable({
  providedIn: 'root',
})
export class TabelaComissaoApiService {

  constructor(
    private requestService: RequestService,
  ) { }

  listarTabela(dados) {
    dados = [];
    return this.requestService.get(`${environment.urlApi}/tabela-comissao/listar`, dados, true);
  }

  detalharTabela(dados) {
    var codigo_tabela = dados.codigo_tabela;
    var codigo_parceria = dados.codigo_parceria;
    if (codigo_tabela != null && codigo_parceria != null) {
      return this.requestService.get(`${environment.urlApi}/tabela-comissao/relatorio-detalhar?codigo_tabela=`
        + String(codigo_tabela) + `&codigo_parceria=` + String(codigo_parceria), dados, true);
    } else {
      return this.requestService.get(`${environment.urlApi}/tabela-comissao/relatorio-detalhar?codigo_tabela=`
        + String(codigo_tabela) + `&codigo_parceria=`, dados, true);
    }
  }
}