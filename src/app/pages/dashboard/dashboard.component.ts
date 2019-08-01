import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import _ from 'lodash';
import { takeWhile } from 'rxjs/operators';

import { CampanhasApiService } from './../../api/campanhas';
import { IndiceContratosDigitadosApiService } from './../../api/indice-contratos-digitados';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {

  private alive = true;

  solarValue: number;

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [];

  statusCardsByThemes: {
    default: CardSettings[];
    dark: CardSettings[];
  } = {
      default: this.commonStatusCardsSet,
      dark: this.commonStatusCardsSet,
    };

  filtro = {
    campanha: {
      label: 'Campanha',
      codigo: 0
    }

  }

  campanhasPerfil = [];
  contratosPagos = [];
  contratosDigitados = [];

  constructor(
    private themeService: NbThemeService,
    private campanhasApiService: CampanhasApiService,
    private indiceContratosDigitadosApiService: IndiceContratosDigitadosApiService
  ) {

    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });
    this.findCampanha();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  findCampanha() {
    this.campanhasPerfil = [];
    this.campanhasApiService.perfil()
      .then((s) => {
        console.log(s);
        this.campanhasPerfil = s;
        this.filtro.campanha.codigo = this.campanhasPerfil[0].codigo_campanha;
        this.findContratos()
      })
      .catch((e) => {
        console.log(e)
      });
  }

  findContratos() {
    this.contratosPagos = [];
    this.contratosDigitados = [];
    this.indiceContratosDigitadosApiService.pagos({
      "codigo_campanha": this.filtro.campanha.codigo,
      "codigo_regional": "",
      "codigo_comercial": "",
      "codigo_loja": "",
      "codigo_funcionario": ""
    })
      .then((s) => {
        console.log(s);
        this.contratosPagos = _.filter(s, (o: any) => {
          return String(o.status) === 'PAGAS';
        });
        this.contratosDigitados = _.filter(s, (o: any) => {
          return String(o.status) === 'DIGITADAS';
        });
      })
      .catch((e) => {
        console.log(e)
      });
  }

  atualizarFiltro(item){
    this.filtro.campanha.codigo = item.codigo_campanha;
    this.findContratos()
  }
}
