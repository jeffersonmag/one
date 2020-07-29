import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { SessionService } from '../../services/session.service';
import { UsuarioApiService } from './../../api/usuario';

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
    private usuarioApiService: UsuarioApiService,
    private router: Router,
    private sessionService: SessionService,
  ) { }

  ngOnInit() {
    this.sessionService.clean();
    this.sessionService.remove('token');
    this.sessionService.remove('codigo_perfil_atuacao');
    this.sessionService.remove('permissao_acesso');
    this.sessionService.remove('permissao_dashboard_campanha');
    this.sessionService.remove('permissao_pendencia_fisico');
    this.sessionService.remove('permissao_esteira_producao');
    this.sessionService.remove('permissao_cadastro_cliente');
    this.sessionService.remove('permissao_cadastro_parceiro_negocio');
    this.sessionService.remove('permissao_cadastro_bancos');
    this.sessionService.remove('permissao_cadastro_plano_de_contas');
    this.sessionService.remove('permissao_cadastro_centro_de_custos');
    this.sessionService.remove('permissao_cadastro_projetos');
    this.sessionService.remove('permissao_cadastro_tipo_conta_corrente');
    this.sessionService.remove('permissao_cadastro_lojas');
    this.sessionService.remove('permissao_cadastro_tipo_lojas');
    this.sessionService.remove('permissao_cadastro_tipo_canal_vendas');
    this.sessionService.remove('permissao_cadastro_financeiro');
  }

  onSubmit(f: NgForm) {
    // console.log(f.value);  // { first: '', last: '' }
    // console.log(f.valid);  // false
    // console.log(f);

    this.userValid = {
      cpf: '',
      senha: '',
    }

    this.erro_api = '';

    if (!f.value.cpf) {
      this.userValid.cpf = 'Informe um CPF';
    }

    if (!f.value.senha) {
      this.userValid.senha = 'Informe uma senha';
    }

    if (f.valid) {
      this.usuarioApiService.dados({
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
