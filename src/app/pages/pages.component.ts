import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
//import { MENU_ITEMS } from './pages-menu';
import { Subject } from 'rxjs';
import { NbMenuItem } from '@nebular/theme';


@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [(items)]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit, OnDestroy {

  menu: NbMenuItem[] = [
    {
      title: 'Produção',
      icon: 'globe-2-outline',
      link: '/pages/dashboard-campanha',
      hidden: (window.sessionStorage.permissao_dashboard_campanha === 'false'),
      home: (window.sessionStorage.permissao_dashboard_campanha === 'false'),
    },

    {
      title: 'Gráficos de Produção',
      icon: 'loader-outline',
      link: '/pages/graficos-producao',
      hidden: (window.sessionStorage.permissao_dashboard_campanha === 'false'),
      home: (window.sessionStorage.permissao_dashboard_campanha === 'false'),
    },

    {
      title: 'Dashboard de Produção',
      icon: 'trending-up-outline',
      link: '/pages/dashboard-producao',
      hidden: true,
      home: false,
    },

    {
      title: 'Comissões',
      icon: 'award-outline',
      link: '/pages/comissoes',
      hidden: (window.sessionStorage.permissao_comissoes_pagas === 'false'),
      home: (window.sessionStorage.permissao_comissoes_pagas === 'false'),
    },

    {
      title: 'Pendência de Físico',
      icon: 'checkmark-square-outline',
      link: '/pages/pendencia-fisico',
      hidden: (window.sessionStorage.permissao_pendencia_fisico === 'false'),
      home: (window.sessionStorage.permissao_pendencia_fisico === 'false'),
    },

    {
      title: 'Esteira de Produção',
      icon: 'flip-outline',
      link: '/pages/esteira-producao',
      hidden: (window.sessionStorage.permissao_esteira_producao === 'false'),
      home: (window.sessionStorage.permissao_esteira_producao === 'false'),
    },

    {
      title: 'Tabela de Comissão e Repasse',
      link: '/pages/tabela-comissao',
      icon: 'book-open-outline',
      home: false,
      expanded: (window.sessionStorage.permissao_tabela_comissao === 'false'),
      hidden: (window.sessionStorage.permissao_tabela_comissao === 'false'),
    },

    {
      title: 'Financeiro',
      link: '/pages/financeiro',
      icon: 'percent-outline',
      home: false,
      expanded: (window.sessionStorage.permissao_cadastro_financeiro === 'false'),
      hidden: (window.sessionStorage.permissao_cadastro_financeiro === 'false'),
    },

    {
      title: 'Cadastros',
      icon: 'grid-outline',
      children: [
        {
          title: 'Bancos',
          link: '/pages/cadastros/bancos',
          icon: 'percent-outline',
          home: false,
          expanded: (window.sessionStorage.permissao_cadastro_bancos === 'false'),
          hidden: (window.sessionStorage.permissao_cadastro_bancos === 'false'),
        },

        {
          title: 'Parceiros de Negócio',
          link: '/pages/cadastros/parceiro-negocio',
          icon: 'briefcase-outline',
          home: false,
          expanded: (window.sessionStorage.permissao_cadastro_parceiro_negocio === 'false'),
          hidden: (window.sessionStorage.permissao_cadastro_parceiro_negocio === 'false'),
        },
        {
          title: 'Plano de Contas',
          link: '/pages/cadastros/plano-contas',
          icon: 'clipboard-outline',
          home: false,
          expanded: (window.sessionStorage.permissao_cadastro_plano_de_contas === 'false'),
          hidden: (window.sessionStorage.permissao_cadastro_plano_de_contas === 'false'),
        },
        {
          title: 'Centro de custos',
          link: '/pages/cadastros/centro-custos',
          icon: 'book-outline',
          home: false,
          expanded: (window.sessionStorage.permissao_cadastro_centro_de_custos === 'false'),
          hidden: (window.sessionStorage.permissao_cadastro_centro_de_custos === 'false'),
        },
        {
          title: 'Projetos',
          link: '/pages/cadastros/projetos',
          icon: 'npm-outline',
          home: false,
          expanded: (window.sessionStorage.permissao_cadastro_projetos === 'false'),
          hidden: (window.sessionStorage.permissao_cadastro_projetos === 'false'),
        },
        {
          title: 'Tipo Conta Corrente',
          link: '/pages/cadastros/tipo-conta-corrente',
          icon: 'credit-card-outline',
          home: false,
          expanded: (window.sessionStorage.permissao_cadastro_tipo_conta_corrente === 'false'),
          hidden: (window.sessionStorage.permissao_cadastro_tipo_conta_corrente === 'false'),
        },
        {
          title: 'Lojas',
          link: '/pages/cadastros/lojas',
          icon: 'home-outline',
          home: false,
          expanded: (window.sessionStorage.permissao_cadastro_lojas === 'false'),
          hidden: (window.sessionStorage.permissao_cadastro_lojas === 'false'),
        },
        {
          title: 'Tipo Loja',
          link: '/pages/cadastros/tipo-lojas',
          icon: 'cube-outline',
          home: false,
          expanded: (window.sessionStorage.permissao_cadastro_tipo_lojas === 'false'),
          hidden: (window.sessionStorage.permissao_cadastro_tipo_lojas === 'false'),
        },
        {
          title: 'Canal de Vendas',
          link: '/pages/cadastros/canal-vendas',
          icon: 'compass-outline',
          home: false,
          expanded: (window.sessionStorage.permissao_cadastro_tipo_canal_vendas === 'false'),
          hidden: (window.sessionStorage.permissao_cadastro_tipo_canal_vendas === 'false'),
        },
        {
          title: 'Configurações',
          link: '/pages/cadastros/configuracoes',
          icon: 'settings-outline',
          home: false,
          expanded: (window.sessionStorage.permissao_cadastro_cliente === 'false'),
          hidden: (window.sessionStorage.permissao_cadastro_cliente === 'false'),
        },
      ],
    },
  ];
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private sessionService: SessionService,
  ) { }

  ngOnDestroy() {
    this.menu = [];
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    const token = this.sessionService.get('token');
    if (!token) {
      this.router.navigate(['/']);
    }
  }

}
