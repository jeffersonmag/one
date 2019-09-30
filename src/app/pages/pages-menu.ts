import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },

  {
    title: 'Dashboard-Campanha',
    icon: 'home-outline',
    link: '/pages/dashboard-campanha',
    home: false,
  },

  {
    title: 'Pendência de Físico',
    icon: 'browser',
    link: '/pages/pendencia-fisico',
    home: false,
  },

  {
    title: 'Esteira de Produção',
    icon: 'flip-outline',
    link: '/pages/esteira-producao',
    home: false,
  },

];
