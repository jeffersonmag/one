import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { number_format, str_pad } from 'locutus/php/strings/';
import _ from 'lodash';
import * as moment from 'moment';
import { takeWhile } from 'rxjs/operators';

import { PendenciaFisicoApiService } from '../../api/pendencia-fisico';


interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-pendencia',
  styleUrls: ['./pendencia.component.scss'],
  templateUrl: './pendencia.component.html',
})
export class PendenciaComponent   {

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
    pendencia: {
      proposta: 0,
      nome_cliente: 0,
      nome_produto_corban: '',
      data_entrada_operacao: 0,
      tipo_operacao: '',
      nome_convenio: '',
      nome_instituicao: '',
      codigo_agente: 0,
      data_status: 0,
      status_fisico_instituicao: '',
      valor_contrato: 0,
      base_calculo: 0,
    },

      codigo: {
        regional: 0,
        comercial: 0,
        loja: 0,
        matriz: 0,
        funcionario: 0,
      }

  }

  pendenciaSelecionada: any;
  pendenciasPerfil = [];
  dadosPendenciasFisico = [];
  dadosPendenciaFisicoLoad = true;
  perfis = [
    {
      id: 5,
      label: 'Regional'
    },
    {
      id: 4,
      label: 'Comercial'
    },
    {
      id: 3,
      label: 'Loja'
    },
    {
      id: 2,
      label: 'Matriz'
    },
    {
      id: 1,
      label: 'Funcionário'
    }
  ];

  revealed = {
    pendencias: true,
    pendenciaFisico: true
  }

  themeSubscription: any;

  constructor(
    private themeService: NbThemeService,
    private pendenciaFisicoApiService: PendenciaFisicoApiService
  ) {

    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });
    this.findPendencia();
  }

  findPendencia() {
    this.pendenciasPerfil = [];
    this.pendenciaFisicoApiService.perfil()
      .then((s) => {
        this.pendenciasPerfil = s;
        this.atualizarFiltro(this.pendenciasPerfil[0]);
      })
      .catch((e) => {
      });
  }

  findPendenciaFisico(visao = 5) {
    this.dadosPendenciaFisicoLoad = true;
    this.dadosPendenciasFisico = [];
    this.pendenciaFisicoApiService.pendencias(
      {
        "pendencia": this.filtro.pendencia,
        "visao": visao
      }
    )
      .then((s) => {
        this.dadosPendenciasFisico = s;

        this.dadosPendenciaFisicoLoad = false;
      })
      .catch((e) => {
        console.log(e);
        this.dadosPendenciaFisicoLoad = false;
      });
  }

  atualizarFiltro(item) {
    this.filtro.pendencia = item.pendencia;
    this.pendenciaSelecionada = item;

    this.findPendencia();
    this.filtraPendenciaPerfil(5);
    this.findPendenciaFisico();
  }

  filtraPendenciaPerfil(event) {
    console.log(event.tabTitle);
    let find = _.find(this.perfis, (o: any) => {
      return String(o.label) === String(event.tabTitle);
    })
    this.findPendenciaFisico(find.id);
  }

  toggleView(acao) {
    this.revealed[acao] = !this.revealed[acao];
  }

}
