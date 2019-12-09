import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  /*{
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },*/
  {
    title: 'Dashboard de Campanhas',
    icon: 'globe-2-outline',
    link: '/pages/dashboard-campanha',
    hidden: (window.sessionStorage.permissao_dashboard_campanha === 'false'),
    home: (window.sessionStorage.permissao_dashboard_campanha === 'false'),
  },

  {
    title: 'Pendência de Físico',
    icon: 'browser',
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
        title: 'Clientes',
        link: '/pages/cadastros/clientes',
        icon: 'people-outline',
        home: false,
        expanded: (window.sessionStorage.permissao_cadastro_cliente === 'false'),
        hidden: (window.sessionStorage.permissao_cadastro_cliente === 'false'),
      },
      {
        title: 'Parceiros de Negócio',
        link: '/pages/cadastros/parceiro-negocio',
        icon: 'briefcase-outline',
        home: false,
        expanded: false, //(window.sessionStorage.permissao_cadastro_parceiro_negocio === 'false'),
        hidden: false,//(window.sessionStorage.permissao_cadastro_parceiro_negocio === 'false'),
      },
    ],
  },
];
