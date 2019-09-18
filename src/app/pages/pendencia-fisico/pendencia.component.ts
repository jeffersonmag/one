import { Component, OnInit } from '@angular/core';
import { NbThemeService, NbSortDirection, NbTreeGridDataSource, } from '@nebular/theme';
import { number_format, str_pad } from 'locutus/php/strings/';
import _ from 'lodash';
import * as moment from 'moment';
import { takeWhile } from 'rxjs/operators';
import { PendenciaFisicoApiService } from '../../api/pendencia-fisico';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { ChildActivationEnd } from '@angular/router';
import { id } from '@swimlane/ngx-charts/release/utils';


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
export class PendenciaComponent implements OnInit {

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

  currentPage = 1;
  itemsPerPage = 20;
  pageSize: number;

  customColumn = 'name';
  defaultColumns = ['size', 'kind', 'items'];
  allColumns = [this.customColumn, ...this.defaultColumns];

  dataSource: NbTreeGridDataSource<any>;

  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  pendencia = [];
  comercial = [];
  regional = [];
  pendenciaRegional = [];
  pendenciaComercial = [];
  pendenciaMatriz = [];
  pendenciaLoja = [];
  pendenciaFuncionario = [];
  limparFiltros: boolean = false;

  funcionario = [];
  loja = [];
  matriz = [];

  dadosPendenciasLoad = true;
  dadosPendencias = [];

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
    this.limparFiltros = false;
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

  findPendenciaRegional(event) {
    this.pendencia = [];
    this.pendenciaRegional = [];
    this.pendenciaFisicoApiService.pendencias({
      "criterio_de_data": "",
      "data_de": "",
      "data_ate": "",
      "codigo_regional": event.currentTarget.id,
      "codigo_comercial": "",
      "codigo_loja": "",
      "codigo_matriz": "",
      "codigo_funcionario": ""
    })
      .then((s) => {
        this.pendenciaRegional = s.agrupado_regional;
        this.pendencia = s.dados;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findPendenciaComercial(event) {
    this.pendencia = [];
    this.pendenciaComercial = [];
    this.pendenciaFisicoApiService.pendencias({
      "criterio_de_data": "",
      "data_de": "",
      "data_ate": "",
      "codigo_regional":  "",
      "codigo_comercial": event.currentTarget.id,
      "codigo_loja": "",
      "codigo_matriz": "",
      "codigo_funcionario": ""
    })
      .then((s) => {
        this.pendenciaComercial = s.agrupado_comercial;
        this.pendencia = s.dados;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findPendenciaMatriz(event) {
    this.pendencia = [];
    this.pendenciaMatriz = [];
    this.pendenciaFisicoApiService.pendencias({
      "criterio_de_data": "",
      "data_de": "",
      "data_ate": "",
      "codigo_regional": "",
      "codigo_comercial":"",
      "codigo_loja": "",
      "codigo_matriz": event.currentTarget.id,
      "codigo_funcionario": ""
    })
      .then((s) => {
        this.pendenciaMatriz = s.agrupado_loja_matriz;
        this.pendencia = s.dados;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findPendenciaLoja(event) {
    this.pendencia = [];
    this.pendenciaLoja = [];
    this.pendenciaFisicoApiService.pendencias({
      "criterio_de_data": "",
      "data_de": "",
      "data_ate": "",
      "codigo_regional": "",
      "codigo_comercial": "",
      "codigo_loja": event.currentTarget.id,
      "codigo_matriz": "",
      "codigo_funcionario": ""
    })
      .then((s) => {
        this.pendenciaLoja = s.agrupado_loja;
        this.pendencia = s.dados;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findPendenciaFuncionario(event) {
    this.pendencia = [];
    this.pendenciaFuncionario = [];
    this.pendenciaFisicoApiService.pendencias({
      "criterio_de_data": "",
      "data_de": "",
      "data_ate": "",
      "codigo_regional": "",
      "codigo_comercial": "",
      "codigo_loja": "",
      "codigo_matriz": "",
      "codigo_funcionario": event.currentTarget.id,
    })
      .then((s) => {
        this.pendenciaFuncionario = s.agrupado_funcionario;
        this.pendencia = s.dados;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  /* filtraPendenciaRegional(event) {
     this.pendencia.filter(dados => this.pendencia === event.currentTarget.id);
   }

   filtraPendenciaComercial(event) {
     this.pendencia.filter(dados => this.pendencia === event.currentTarget.id);
   }

   filtraPendenciaMatriz(event) {
     this.pendencia.filter(dados => this.pendencia === event.currentTarget.id);
   }

   filtraPendenciaLoja(event) {
     this.pendencia.filter(dados => this.pendencia === event.currentTarget.id);
   }

   filtraPendenciaFuncionario(event) {
     this.pendencia.filter(dados => this.pendencia === event.currentTarget.id);
   } */

  toggleView(acao) {
    this.revealed[acao] = !this.revealed[acao];
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  limparFiltro () {
    this.pendencia = [];
    this.limparFiltros = true;
    this.regional[0];
    this.comercial[0];
    this.matriz[0];
    this.loja[0];
    this.funcionario[0];
  }

  ngOnInit() {}

}
