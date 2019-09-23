import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { number_format, str_pad } from 'locutus/php/strings/';
import _ from 'lodash';
import * as moment from 'moment';
import { takeWhile } from 'rxjs/operators';

import { CampanhasApiService } from './../../api/campanhas';
import { DiasUteisPeriodoApiService } from './../../api/dias-uteis-periodo';
import { IndiceContratosDigitadosApiService } from './../../api/indice-contratos-digitados';
import { TicketMedioApiService } from './../../api/ticket-medio';

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
    },
    produto: {
      label: 'Produto',
      codigo: 0
    }
  }

  chartOptions: any = {};

  campanhaSelecionada: any;
  campanhasPerfil = [];
  contratosPagos = [];
  contratosDigitados = [];
  contratosPagosSinteticos = {
    "qtd_total_digitado": 0,
    "qtd_total_pago": 0,
    "relacao_qtd_digitado_pago": 0,
    "relacao_valor_digitado_pago": 0,
    "valor_elegivel_total_digitado": 0,
    "valor_elegivel_total_pago": 0
  };
  campanhaDias = 0;
  campanhaPendencias = 0;
  ticketPerfil = 0;
  ticketGlobal = 0;
  dadosCampanhaMetas = [];
  dadosProdutoCorbanCampanha = {};
  dadosCampanhaMetasLoad = true;
  perfis = [
    {
      id: 5,
      label: 'Diretor'
    },
    {
      id: 4,
      label: 'Regional'
    },
    {
      id: 3,
      label: 'Comercial'
    },
    {
      id: 2,
      label: 'Loja'
    },
    {
      id: 1,
      label: 'Promotor'
    }
  ];

  perfilAtivo = 5;

  revealed = {
    campanhas: false,
    chart: true,
    metasCampanhas: true,
    produtosCorban: true
  }

  ordem = {
    campanhas: {
      codigo_campanha: 'asc',
      nome_campanha: 'asc',
      data_inicio_campanha: 'asc',
      data_fim_campanha: 'asc'
    },
    metas: {
      nome_agrupamento: 'asc',
      nivel_atingimento_campanha: 'asc',
      meta_total_campanha: 'asc',
      atingimento_total_campanha: 'asc',
      meta_diaria_campanha: 'asc',
      projecao_total_campanha: 'asc',
      ticket_medio_campanha: 'asc',
      total_hc_participantes: 'asc'
    },
    produtos: {
      nome_produto_corban: 'asc',
      valor_atingido_meta_producao_produto_corban: 'asc',
      nivel_atingimento_produto_corban: 'asc',
      projecao_produto_corban: 'asc',
      meta_diaria_produto_corban: 'asc',
      ticket_medio_produto_corban: 'asc',
      percentual_atingido_produto_corban: 'asc'
    }
  }


  codigos = {
    codigo_regional: "",
    codigo_comercial: "",
    codigo_loja: "",
    codigo_funcionario: ""
  }


  themeSubscription: any;

  constructor(
    private themeService: NbThemeService,
    private campanhasApiService: CampanhasApiService,
    private diasUteisPeriodoApiService: DiasUteisPeriodoApiService,
    private ticketMedioApiService: TicketMedioApiService,
    private indiceContratosDigitadosApiService: IndiceContratosDigitadosApiService
  ) {

    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });
    this.findCampanha();
  }

  gerarGrafico() {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      let datas = [];
      let digitados = [];
      let pagos = [];

      for (let i of this.contratosPagos) {
        datas.push(`${i.ano}-${str_pad(i.mes, 2, 0, 'STR_PAD_LEFT')}-${str_pad(i.dia, 2, 0, 'STR_PAD_LEFT')}`);
      }
      for (let i of this.contratosDigitados) {
        let find = datas.find((val: any) => {
          return String(`${i.ano}-${str_pad(i.mes, 2, 0, 'STR_PAD_LEFT')}-${str_pad(i.dia, 2, 0, 'STR_PAD_LEFT')}`) === String(val);
        });
        if (!find) {
          datas.push(`${i.ano}-${str_pad(i.mes, 2, 0, 'STR_PAD_LEFT')}-${str_pad(i.dia, 2, 0, 'STR_PAD_LEFT')}`);
        }
      }

      for (let i of datas) {
        let find = _.find(this.contratosDigitados, (o: any) => {
          return String(i) === String(`${o.ano}-${str_pad(o.mes, 2, 0, 'STR_PAD_LEFT')}-${str_pad(o.dia, 2, 0, 'STR_PAD_LEFT')}`)
        });
        if (!find) {
          digitados.push(0);
        } else {
          digitados.push(find.total_valor_elegivel);
        }
        find = _.find(this.contratosPagos, (o: any) => {
          return String(i) === String(`${o.ano}-${str_pad(o.mes, 2, 0, 'STR_PAD_LEFT')}-${str_pad(o.dia, 2, 0, 'STR_PAD_LEFT')}`)
        });
        if (!find) {
          pagos.push(0);
        } else {
          pagos.push(find.total_valor_elegivel);
        }
      }

      datas = _.orderBy(datas, [(o: any) => {
        return o;
      }], ['asc']);

      for (let i in datas) {
        datas[i] = moment(datas[i]).format('DD/MM');
      }

      this.chartOptions = {
        backgroundColor: echarts.bg,
        color: [colors.success, colors.info],
        tooltip: {
          trigger: 'none',
          axisPointer: {
            type: 'cross',
          },
        },
        legend: {
          data: ['Digitados', 'Pagos'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        grid: {
          top: 70,
          bottom: 50,
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors.info,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
            axisPointer: {
              label: {
                formatter: params => {
                  return (
                    'Valores ' + params.value + (params.seriesData.length ? ' ： ' + 'R$ ' + number_format(params.seriesData[0].data, 2, ',', '.') : '')
                  );
                },
              },
            },
            data: datas,
          },
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors.success,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
            axisPointer: {
              label: {
                formatter: params => {
                  return (
                    'Valores ' + params.value + (params.seriesData.length ? ' ： ' + 'R$ ' + number_format(params.seriesData[0].data, 2, ',', '.') : '')
                  );
                },
              },
            },
            data: datas,
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: 'Pagos',
            type: 'line',
            xAxisIndex: 1,
            smooth: true,
            data: pagos,
          },
          {
            name: 'Digitados',
            type: 'line',
            smooth: true,
            data: digitados,
          },
        ],
      };
    });
  }

  ngOnDestroy() {
    this.alive = false;
    this.themeSubscription.unsubscribe();
  }

  findCampanha() {
    this.campanhasPerfil = [];
    this.campanhasApiService.perfil()
      .then((s) => {
        this.campanhasPerfil = s;
        this.atualizarFiltro(this.campanhasPerfil[0]);
      })
      .catch((e) => {
        console.log(e)
      });
  }

  findCampanhaMeta(visao = 5) {
    this.dadosCampanhaMetasLoad = true;
    this.dadosCampanhaMetas = [];
    this.dadosProdutoCorbanCampanha = {};
    this.campanhasApiService.metas(
      {
        "codigo_campanha": this.filtro.campanha.codigo,
        "visao": visao,
        "codigo_regional": this.codigos.codigo_regional,
        "codigo_comercial": this.codigos.codigo_comercial,
        "codigo_loja": this.codigos.codigo_loja,
        "codigo_funcionario": this.codigos.codigo_funcionario
      }
    )
      .then((s) => {
        this.dadosCampanhaMetas = s;
        this.dadosCampanhaMetasLoad = false;
        if (this.dadosCampanhaMetas) {
          this.findDadosProdutoCorbanCampanha(this.dadosCampanhaMetas[0]);
        }
      })
      .catch((e) => {
        console.log(e);
        this.dadosCampanhaMetasLoad = false;
      });
  }

  findContratos() {
    this.contratosPagos = [];
    this.contratosDigitados = [];
    this.indiceContratosDigitadosApiService.pagos({
      "codigo_campanha": this.filtro.campanha.codigo,
      "codigo_regional": this.codigos.codigo_regional,
      "codigo_comercial": this.codigos.codigo_comercial,
      "codigo_loja": this.codigos.codigo_loja,
      "codigo_funcionario": this.codigos.codigo_funcionario
    })
      .then((s) => {
        this.contratosPagos = _.filter(s, (o: any) => {
          return String(o.status) === 'PAGAS';
        });
        this.contratosDigitados = _.filter(s, (o: any) => {
          return String(o.status) === 'DIGITADAS';
        });
        this.gerarGrafico();
      })
      .catch((e) => {
        console.log(e)
      });

    this.contratosPagosSinteticos = {
      "qtd_total_digitado": 0,
      "qtd_total_pago": 0,
      "relacao_qtd_digitado_pago": 0,
      "relacao_valor_digitado_pago": 0,
      "valor_elegivel_total_digitado": 0,
      "valor_elegivel_total_pago": 0
    };
    this.indiceContratosDigitadosApiService.sintetico({
      "codigo_campanha": this.filtro.campanha.codigo,
      "codigo_regional": this.codigos.codigo_regional,
      "codigo_comercial": this.codigos.codigo_comercial,
      "codigo_loja": this.codigos.codigo_loja,
      "codigo_funcionario": this.codigos.codigo_funcionario
    })
      .then((s) => {
        for (let i of s) {
          this.contratosPagosSinteticos = i;
        }

      })
      .catch((e) => {
        console.log(e)
      });
  }

  findDiasUteis() {
    this.diasUteisPeriodoApiService.periodo(
      {
        "data_inicial": this.campanhaSelecionada.data_inicio_campanha,
        "data_final": this.campanhaSelecionada.data_fim_campanha
      }
    )
      .then((s) => {
        this.campanhaDias = s.qtd_dias_uteis;
      })
      .catch((e) => {
        console.log(e);
      })
    this.diasUteisPeriodoApiService.periodo(
      {
        //"data_inicial": this.campanhaSelecionada.data_inicio_pendencia_fisico,
        "data_inicial": moment().format('YYYY-MM-DD'),
        "data_final": this.campanhaSelecionada.data_fim_pendencia_fisico
      }
    )
      .then((s) => {
        this.campanhaPendencias = s.qtd_dias_uteis;
      })
      .catch((e) => {
        console.log(e);
      })
  }

  findTickets() {
    this.ticketPerfil = 0;
    this.ticketGlobal = 0;
    this.ticketMedioApiService.perfil({
      "codigo_campanha": this.filtro.campanha.codigo,
      "codigo_regional": this.codigos.codigo_regional,
      "codigo_comercial": this.codigos.codigo_comercial,
      "codigo_loja": this.codigos.codigo_loja,
      "codigo_funcionario": this.codigos.codigo_funcionario
    })
      .then((s) => {
        this.ticketPerfil = s.ticket_medio_perfil;
      })
      .catch((e) => {
        console.log(e)
      });
    this.ticketMedioApiService.global({
      "codigo_campanha": this.filtro.campanha.codigo,
      "codigo_regional": this.codigos.codigo_regional,
      "codigo_comercial": this.codigos.codigo_comercial,
      "codigo_loja": this.codigos.codigo_loja,
      "codigo_funcionario": this.codigos.codigo_funcionario
    })
      .then((s) => {
        this.ticketGlobal = s.ticket_medio_global;
      })
      .catch((e) => {
        console.log(e)
      });
  }

  atualizarFiltro2(item) {
    this.codigos.codigo_regional = '';
    this.codigos.codigo_comercial = '';
    this.codigos.codigo_loja = '';
    this.codigos.codigo_funcionario = '';
    this.atualizarFiltro(item);
  }

  atualizarFiltro(item) {
    this.filtro.campanha.codigo = item.codigo_campanha;
    this.campanhaSelecionada = item;
    this.findContratos();
    this.findDiasUteis();
    this.findTickets();
    this.findCampanhaMeta(this.perfilAtivo);
  }

  filtraCampanhaPerfil(event) {
    let find = _.find(this.perfis, (o: any) => {
      return String(o.label) === String(event.tabTitle);
    })
    this.perfilAtivo = find.id;
    this.findCampanhaMeta(find.id);
  }

  findDadosProdutoCorbanCampanhaFiltro(item) {
    this.dadosProdutoCorbanCampanha = item;

    if (this.perfilAtivo === 4) {
      this.codigos.codigo_regional = String(item.codigo_agrupamento);
    }

    if (this.perfilAtivo === 3) {
      this.codigos.codigo_comercial = String(item.codigo_agrupamento);
    }

    if (this.perfilAtivo === 2) {
      this.codigos.codigo_loja = String(item.codigo_agrupamento);
    }

    if (this.perfilAtivo === 1) {
      this.codigos.codigo_funcionario = String(item.codigo_agrupamento);
    }

    this.findContratos();
    this.findTickets();
    this.findCampanhaMeta(this.perfilAtivo);
  }

  findDadosProdutoCorbanCampanha(item) {
    this.filtro.produto.codigo = item.codigo_agrupamento
    this.dadosProdutoCorbanCampanha = item;
    this.findTickets();
  }

  findDadosProdutoCorbanCampanhaDetalhes(item) {
    this.dadosProdutoCorbanCampanha = item;
  }

  resetar() {
    this.codigos.codigo_regional = '';
    this.codigos.codigo_comercial = '';
    this.codigos.codigo_loja = '';
    this.codigos.codigo_funcionario = '';
    this.findCampanhaMeta(this.perfilAtivo);
    this.atualizarFiltro(this.campanhaSelecionada);
  }

  toggleView(acao) {
    this.revealed[acao] = !this.revealed[acao];
  }

  ordernar(dados: string, tabela, campo) {
    let l = dados.split('.');

    let t;

    if (l.length === 1) {
      t = this[l[0]];
    }
    if (l.length === 2) {
      t = this[l[0]];
      t = t[l[1]];
    }


    let ordem = 'asc';

    if (this.ordem[tabela][campo] === 'asc') {
      ordem = 'desc';
    } else {
      ordem = 'asc';
    }

    this.ordem[tabela][campo] = ordem;

    t = _.orderBy(t, [campo], [ordem]);
    if (l.length === 1) {
      this[dados] = t;
    }
    if (l.length === 2) {
      this[l[0]][l[1]] = t;
    }

  }

}
