import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { RequestService } from '../services/request.service';
import { SessionService } from './../services/session.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioApiService {

  constructor(
    private requestService: RequestService,
    private sessionService: SessionService,
  ) { }


  // 'codigo_conexao': 9 // usar esse parametro em ambiente de teste completo banco e máquina
  // 'codigo_conexao': 8 // máquina do Rafael Banco de produção

  dados(user) {
    return new Promise((resolve, reject) => {
      const response = this.requestService.post(`${environment.urlToken}/dados-usuario`, {
        'cpf': user.cpf,
        'senha': String(user.senha).toUpperCase(),
        'projeto': 'CORBAN',
        'at_cliente': 'RIBERCRED'
      });
      response
        .then((s) => {
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
          this.sessionService.set('user', s);
          this.sessionService.set('token', s.token);
          this.sessionService.set('cpf_usuario_logado', user.cpf);
          this.sessionService.set('codigo_perfil_atuacao', s.codigo_perfil_atuacao);
          this.sessionService.set('permissao_acesso', s.permissao_acesso);
          this.sessionService.set('permissao_dashboard_campanha', s.permissao_acesso.dashboard_campanha.acesso);
          this.sessionService.set('permissao_pendencia_fisico', s.permissao_acesso.pendencia_fisico.acesso);
          this.sessionService.set('permissao_esteira_producao', s.permissao_acesso.esteira_producao.acesso);
          this.sessionService.set('permissao_cadastro_cliente', s.permissao_acesso.cadastro_cliente_teste_1.acesso);
          this.sessionService.set('permissao_cadastro_parceiro_negocio', s.permissao_acesso.cadastro_pn.acesso);
          this.sessionService.set('permissao_cadastro_bancos', s.permissao_acesso.cadastro_bancos.acesso);
          this.sessionService.set('permissao_cadastro_plano_de_contas',
            s.permissao_acesso.cadastro_plano_de_contas.acesso);
          this.sessionService.set('permissao_cadastro_centro_de_custos',
            s.permissao_acesso.cadastro_centro_de_custos.acesso);
          this.sessionService.set('permissao_cadastro_projetos',
            s.permissao_acesso.cadastro_projetos.acesso);
          this.sessionService.set('permissao_cadastro_tipo_conta_corrente',
            s.permissao_acesso.cadastro_tipo_conta_corrente.acesso);
          this.sessionService.set('permissao_cadastro_lojas',
            s.permissao_acesso.cadastro_loja.acesso);
          this.sessionService.set('permissao_cadastro_tipo_lojas',
            s.permissao_acesso.cadastro_tipo_loja.acesso);
          this.sessionService.set('permissao_cadastro_tipo_canal_vendas',
            s.permissao_acesso.cadastro_tipo_canal_venda.acesso);
          this.sessionService.set('permissao_cadastro_financeiro',
            s.permissao_acesso.manutencao_financeiro.acesso);
          this.sessionService.set('permissao_tabela_comissao',
            s.permissao_acesso.tabela_comissao.acesso);
          resolve(s);
        })
        .catch((e) => {
          console.log(e);
          reject('Erro de autenticação do usuário');
        });
    });
  }
}
