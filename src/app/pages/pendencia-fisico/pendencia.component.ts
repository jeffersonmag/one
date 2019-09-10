import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { number_format, str_pad } from 'locutus/php/strings/';
import _ from 'lodash';
import * as moment from 'moment';
import { takeWhile } from 'rxjs/operators';
import { PendenciaFisicoApiService } from '../../api/pendencia-fisico';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { ChildActivationEnd } from '@angular/router';


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
    pendenciaFisico: true,
  };

  themeSubscription: any;

  pendencia = [];
  comercial = [];
  regional = [];
  funcionario = [];
  loja = [];
  matriz = [];
  dadosPendenciasLoad = true;
  dadosPendencias = [];

  codigos = {
    codigo_regional: '',
    codigo_comercial: '',
    codigo_matriz: '',
    codigo_loja: '',
    codigo_funcionario: ''
  };

  agrupado = [
    {
      codigo_regional: '',
      categoria: 'Regional',
    },

    {
      codigo_comercial: '',
      categoria: 'Comercial',
    },

    {
      codigo_matriz: '',
      categoria: 'Matriz',
    },

    {
      codigo_loja: '',
      categoria: 'Loja',
    },

    {
      codigo_funcionario: '',
      categoria: 'Funcionário',
    },

  ];

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
        console.log(e);
      });
  }

  filterPendencia(id) {
    this.dadosPendenciasLoad = true;
    this.dadosPendencias = [];
    this.pendenciaFisicoApiService.pendencias(
      {
        'codigo_regional': this.codigos.codigo_regional,
        'codigo_comercial': this.codigos.codigo_comercial,
        'codigo_matriz': this.codigos.codigo_matriz,
        'codigo_loja': this.codigos.codigo_loja,
        'codigo_funcionario': this.codigos.codigo_funcionario,
      },
    )

      .then((s) => {
        this.dadosPendencias = s;

        console.log(s);
        this.dadosPendenciasLoad = false;
      })

      .catch((e) => {
        console.log(e);
        this.dadosPendenciasLoad = false;
      });
  }

  filtraPendenciaFisico(event) {

    // console.log('meu evento', event.currentTarget.id);
    let filter = this.dadosPendencias.filter(this.agrupado, ((o: any) => {
      return String(o.agrupado) === String(event.currentTarget.id);
    })
    this.filterPendencia(filter.id);
  }

  toggleView(acao) {
    this.revealed[acao] = !this.revealed[acao];
  }

}
