import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { RequestService } from './../services/request.service';
import { SessionService } from './../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService {

  constructor(
    private requestService: RequestService,
    private sessionService: SessionService
  ) { }

  openToken(user) {
    return new Promise((resolve, reject) => {
      const response = this.requestService.postLogin(
        environment.urlAutentication,
        {
          "cpf": user.cpf,
          "senha": String(user.senha).toUpperCase(),
          "projeto": "CORBAN",
          "at_cliente": "RIBERCRED"
        });

      response
        .then((s) => {
          console.log('sucesso')
          console.log(s)
          this.sessionService.set('token', s);
          resolve(true);
        })
        .catch((e) => {
          console.log('Error');
          console.log(e);
          reject('Usuário não autorizado.');
        })
    })

  }
}
