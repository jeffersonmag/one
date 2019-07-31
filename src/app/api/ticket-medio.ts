import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { RequestService } from '../services/request.service';

@Injectable({
  providedIn: 'root'
})
export class TicketMedioApiService {

  constructor(
    private requestService: RequestService,
  ) { }

  global(dados = {}) {
    return this.requestService.post(`${environment.urlApi}/ticket-medio-global`, dados, true);
  }

  perfil(dados = {}) {
    return this.requestService.post(`${environment.urlApi}/ticket-medio-perfil`, dados, true);
  }

}
