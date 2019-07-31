import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { SessionService } from '../../services/session.service';
import { LoginApiService } from './../../api/login';

@Component({
  selector: 'ngx-tela',
  templateUrl: './tela.component.html',
  styleUrls: ['./tela.component.scss']
})
export class TelaComponent implements OnInit {

  public erro_api = '';
  public userValid = {
    cpf: '',
    senha: ''
  }


  constructor(
    private loginApiService: LoginApiService,
    private router: Router,
    private sessionService: SessionService,
  ) { }

  ngOnInit() {
    this.sessionService.remove('token');
  }

  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
    console.log(f);

    this.userValid = {
      cpf: '',
      senha: ''
    }

    this.erro_api = '';

    if (!f.value.cpf) {
      this.userValid.cpf = 'Informe um CPF';
    }

    if (!f.value.senha) {
      this.userValid.senha = 'Informe uma senha';
    }

    if (f.valid) {
      console.log('dados validos');

      this.loginApiService.openToken({
        "cpf": f.value.cpf,
        "senha": f.value.senha
      })
        .then((s) => {
          this.router.navigate(['/pages']);
        })
        .catch((e) => {
          this.erro_api = e;
        })
    }

  }
}
