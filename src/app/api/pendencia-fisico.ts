import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { RequestService } from '../services/request.service';

@Injectable({
  providedIn: 'root',
})
export class PendenciaFisicoApiService {

  constructor(
    private requestService: RequestService,
  ) { }

  pendencias(dados) {
    return this.requestService.post(`${environment.urlApi}/resumo-pendencia-fisico-analitico-perfil`, dados, true);
  }

  pendenciasSintetico(dados) {
    return this.requestService.post(`${environment.urlApi}/resumo-pendencia-fisico-sintetico-perfil`, dados, true);
  }

  enviarPreBordero(dados) {
    return this.requestService.put(`${environment.urlApi}/pendencia-fisico-contrato-pre-bordero`, dados, true);
  }

  retirarPreBordero(dados) {
    return this.requestService.delete(`${environment.urlApi}/pendencia-fisico-contrato-pre-bordero`, dados, true);
  }

  gerarBordero(dados) {
    return this.requestService.put(`${environment.urlApi}/pendencia-fisico-contrato-gerar-bordero`, dados, true);
  }

  listarBordero(dados) {
    return this.requestService.get(`${environment.urlApi}/lista-bordero-envio-fisico`, dados, true);
  }

  imprimirBorderoRemessa(dados, bordero: string) {
    return this.requestService.getDownload(`${environment.urlApi}/imprime-bordero-remessa/` + bordero, dados, true);
  }

  imprimirBorderoRegularizacao(dados, bordero: string) {
    return this.requestService.getDownload(`${environment.urlApi}/imprime-bordero-regularizacao/`
    + bordero, dados, true);
  }
}
