import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { RequestService } from '../services/request.service';
import { SessionService } from './../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioApiService {

  constructor(
    private requestService: RequestService,
    private sessionService: SessionService,
  ) { }

  dados(user) {
    return new Promise((resolve, reject) => {
      const response = this.requestService.post(`${environment.urlApi}/dados-usuario`, {
        "cpf": user.cpf,
        "senha": String(user.senha).toUpperCase(),
        "projeto": "CORBAN",
        "at_cliente": "RIBERCRED"
      });
      response
        .then((s) => {
          this.sessionService.set('user', s) ;
          this.sessionService.set('token', s.token) ;  
          this.sessionService.set('codigo_perfil_atuacao', s.codigo_perfil_atuacao) ;    
          resolve(s);
        })
        .catch((e) => {
          console.log(e);
          reject('Usuário ou senha inválidos');
        })
    })

  }
}
