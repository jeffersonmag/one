import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { RequestService } from '../services/request.service';

@Injectable({
  providedIn: 'root'
})
export class ComissoesApiService {

  constructor(
    private requestService: RequestService,
  ) { }

  ExtratoPagamentoSintetico(dados) {
    return this.requestService.get(`${environment.urlApi}/comissao/extrato-pagamento-comissao-sintetico`, dados, true);
  }

  AnaliticoComissoesPagasCSV(dados) {
    return this.requestService.getDownload(`${environment.urlApi}/comissao/extrato-pagamento-comissao-analitico?codigo_pagar=` + dados, 'text/csv;charset=ANSI', dados, true, `comissoes_` + dados);
  }

}
