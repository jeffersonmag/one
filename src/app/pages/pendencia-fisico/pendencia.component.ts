import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { number_format, str_pad } from 'locutus/php/strings/';
import _ from 'lodash';
import * as moment from 'moment';
import { takeWhile } from 'rxjs/operators';
import { PendenciaFisicoApiService } from '../../api/pendencia-fisico';
import { Pendencias } from './pendencia.model';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-pendencia',
  styleUrls: ['./pendencia.component.scss'],
  templateUrl: './pendencia.component.html',
  preserveWhitespaces: true,
})
export class PendenciaComponent {

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
  revealed = {
    pendencias: true,
    pendenciaFisico: true
  }

  themeSubscription: any;

  pendencia = [];
  comercial = [];
  regional = [];
  funcionario = [];
  loja = [];
  matriz = [];

  constructor(
    private themeService: NbThemeService,
    private pendenciaFisicoApiService: PendenciaFisicoApiService,
  ) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });
    this.findPendencia();
  }

  findPendencia() {
    this.pendencia = [];
    this.comercial = [];
    this.pendenciaFisicoApiService.pendencias()
      .then((s) => {
        this.comercial = s.agrupado_comercial;
        this.regional = s.agrupado_regional;
        this.funcionario = s.agrupado_funcionario;
        this.loja = s.agrupado_loja;
        this.matriz = s.agrupado_loja_matriz;
        this.pendencia = s.dados;
      })
      .catch((e) => {
        console.log(e)
      });
  }

  compararPerfil(obj1, obj2) {
    return obj1 && obj2 ? (obj1.pendencia !== obj2.pendencia) : false;

  }


  toggleView(acao) {
    this.revealed[acao] = !this.revealed[acao];
  }

}
