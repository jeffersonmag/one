import { Component, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { number_format, str_pad } from 'locutus/php/strings/';
import _ from 'lodash';
import * as moment from 'moment';
import { takeWhile } from 'rxjs/operators';
import { CampanhasApiService } from '../../api/campanhas';
import { DiasUteisPeriodoApiService } from '../../api/dias-uteis-periodo';
import { IndiceContratosDigitadosApiService } from '../../api/indice-contratos-digitados';
import { TicketMedioApiService } from '../../api/ticket-medio';
import { NbPopoverDirective } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';


interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard-campanha.component.scss'],
  templateUrl: './dashboard-campanha.component.html',
})
export class DashboardCampanhaComponent implements OnDestroy {

  @ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;
  @ViewChild('list', { read: TemplateRef, static: false }) templateList: TemplateRef<any>;

  private alive = true;

  solarValue: number;

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [];

  nomeCampanhaSelecionado: string;
  periodoCampanhaSelecionado: string;

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

  settings = {
    hideSubHeader: true,
    //filter: false,    
    prop: {
      filter: false
    },
    /*add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },*/
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    attr: {
      class: 'table table-bordered'
    },
    columns: {
      nome_agrupamento: {
        title: 'Loja / Promotor',
        type: 'string',
        filter: false
      },
      meta_total_campanha: {
        title: 'Meta Total',
        type: 'number',
        filter: false
      },
      atingimento_total_campanha: {
        title: 'Atingido',
        type: 'number',
        filter: false
      },
      perc_atingimento_total_campanha: {
        title: '% Atingido',
        type: 'number',
        filter: false
      },
      ticket_medio_campanha: {
        title: 'Ticket Médio',
        type: 'number',
        filter: false
      },
      meta_diaria_campanha: {
        title: 'Meta Diária',
        type: 'number',
        filter: false
      },
      meta_recalculada: {
        title: 'Meta Recalculada',
        type: 'number',
        filter: false
      },
      projecao_total_campanha: {
        title: 'Total campanha projetado',
        type: 'number',
        filter: false
      },
      total_hc_participantes: {
        title: 'HC',
        type: 'number',
        filter: false
      },
    }
  }

  dadosCampanhaMetasSmartTable = [];

  source: LocalDataSource = new LocalDataSource();

  chartOptions: any = {};

  campanhaSelecionada: any;
  campanhasPerfil = [];
  contratosPagos = [];
  contratosDigitados = [];
  datasHoje = [];
  datasOntem = [];
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
  porcentagemMetas = 0;
  dadosCampanhaMetas = [];

  dadosProdutoCorbanCampanha = [];
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

  perfisCampanha = [
    {
      id: 2,
      label: 'LOJAS'
    },
    {
      id: 1,
      label: 'PROMOTORES'
    }
  ];

  perfilAtivo = window.sessionStorage.codigo_perfil_atuacao;

  mes = [
    {
      id: 1,
      label: 'Jan',
      mesExtenso: 'Janeiro'
    },
    {
      id: 2,
      label: 'Fev',
      mesExtenso: 'Fevereiro'
    },
    {
      id: 3,
      label: 'Mar',
      mesExtenso: 'Março'
    },
    {
      id: 4,
      label: 'Abr',
      mesExtenso: 'Abril'
    },
    {
      id: 5,
      label: 'Mai',
      mesExtenso: 'Maio'
    },
    {
      id: 6,
      label: 'Jun',
      mesExtenso: 'Junho'
    },
    {
      id: 7,
      label: 'Jul',
      mesExtenso: 'Julho'
    },
    {
      id: 8,
      label: 'Ago',
      mesExtenso: 'Agosto'
    },
    {
      id: 9,
      label: 'Set',
      mesExtenso: 'Setembro'
    },
    {
      id: 10,
      label: 'Out',
      mesExtenso: 'Outubro'
    },
    {
      id: 11,
      label: 'Nov',
      mesExtenso: 'Novembro'
    },
    {
      id: 12,
      label: 'Dez',
      mesExtenso: 'Dezembro'
    }
  ];

  revealed = {
    campanhas: false,
    chart: true,
    metasCampanhas: true,
    produtoxsxCorbans: true
  };

  valor = 100.00;

  option: any = {};
  themeSubscription: any;

  hoje: any = moment(Date.now());
  ontem: any = new Date();

  dataAtual = new Date(this.hoje);
  anoVigente = this.dataAtual.getFullYear();
  mesVigente = this.dataAtual.getMonth() + 1;

  ngOnInit() {
    this.ontem.setDate(this.ontem.getDate() - 1);
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

  dadosProdutosCorban = {
    "codigo_produto_corban": 0,
    "meta_diaria_produto_corban": 0,
    "meta_producao_produto_corban": 0,
    "nivel_atingimento_produto_corban": 0,
    "nome_produto_corban": "",
    "nota_nivel_atingido": 0,
    "percentual_atingido_produto_corban": 0,
    "projecao_produto_corban": 0,
    "qtd_elegivel_seguro": 0,
    "qtd_realizado_seguro": 0,
    "qtd_total_contratos_campanha": 0,
    "ticket_medio_produto_corban": 0,
    "valor_atingido_meta_producao_produto_corban": 0
  }

  codigos = {
    codigo_regional: "",
    codigo_comercial: "",
    codigo_loja: "",
    codigo_funcionario: ""
  }

  constructor(
    private themeService: NbThemeService,
    private theme: NbThemeService,
    private campanhasApiService: CampanhasApiService,
    private diasUteisPeriodoApiService: DiasUteisPeriodoApiService,
    private ticketMedioApiService: TicketMedioApiService,
    private indiceContratosDigitadosApiService: IndiceContratosDigitadosApiService,
    //private service: SmartTableData    
  ) {

    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });
    this.source.load(this.dadosCampanhaMetasSmartTable);
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

  findCampanhaMeta(visao) {
    this.dadosCampanhaMetasLoad = true;
    this.dadosCampanhaMetas = [];
    this.dadosProdutoCorbanCampanha = [];
    this.dadosCampanhaMetasSmartTable = [];
    this.campanhasApiService.metas(
      {
        "codigo_campanha": this.filtro.campanha.codigo,
        "visao": visao,
        "codigo_regional": this.codigos.codigo_regional,
        "codigo_comercial": this.codigos.codigo_comercial,
        "codigo_loja": this.codigos.codigo_loja,
        "codigo_funcionario": this.codigos.codigo_funcionario,
      }
    )
      .then((s) => {
        this.dadosCampanhaMetas = s;
        for (let i of this.dadosCampanhaMetas) {
          this.dadosCampanhaMetasSmartTable.push(
            {
              nome_agrupamento: i.nome_agrupamento,
              meta_total_campanha: number_format(i.meta_total_campanha, 2, ',', '.'),
              atingimento_total_campanha: number_format(i.atingimento_total_campanha, 2, ',', '.'),
              perc_atingimento_total_campanha: number_format((i.atingimento_total_campanha / i.meta_total_campanha) * 100, 2, ',', '.'),
              ticket_medio_campanha: number_format(i.ticket_medio_campanha, 2, ',', '.'),
              meta_diaria_campanha: number_format((i.meta_total_campanha / this.campanhaDias), 2, ',', '.'),
              meta_recalculada: number_format(((i.meta_total_campanha - i.atingimento_total_campanha) / this.campanhaPendencias), 2, ',', '.'),
              projecao_total_campanha: number_format(i.projecao_total_campanha, 2, ',', '.'),
              total_hc_participantes: i.total_hc_participantes
            });
        }
        this.source.load(this.dadosCampanhaMetasSmartTable);
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
    this.datasHoje = [];
    this.datasOntem = [];
    this.contratosPagos = [];
    this.contratosDigitados = [];
    this.indiceContratosDigitadosApiService.pagos({
      "codigo_campanha": this.filtro.campanha.codigo,
      "codigo_regional": this.codigos.codigo_regional,
      "codigo_comercial": this.codigos.codigo_comercial,
      "codigo_loja": this.codigos.codigo_loja,
      "codigo_funcionario": this.codigos.codigo_funcionario,
      "data": ""
    })
      .then((s) => {

        this.contratosPagos = _.filter(s, (o: any) => {
          return String(o.status) === 'PAGAS';
        });
        this.contratosDigitados = _.filter(s, (o: any) => {
          return String(o.status) === 'DIGITADAS';
        });
        this.gerarGrafico();

        if (this.contratosPagos[0].mes == this.mesVigente) {
          this.indiceContratosDigitadosApiService.pagos({
            "codigo_campanha": this.filtro.campanha.codigo,
            "data": this.hoje,
          })
            .then((c) => {
              this.datasHoje = c;
            })
            .catch((e) => {
              console.log(e)
            });

          this.indiceContratosDigitadosApiService.pagos({
            "codigo_campanha": this.filtro.campanha.codigo,
            "data": this.ontem,
          })
            .then((d) => {
              this.datasOntem = d;
            })
            .catch((e) => {
              console.log(e)
            });
        } else {
          this.datasOntem = [];
          this.datasHoje = [];
        }
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
    this.nomeCampanhaSelecionado = item.nome_campanha;

    let dataInicioCampanhaApi = moment(String(item.data_inicio_campanha).substring(0, 10)).format('YYYY-MM-DD');
    let dataInicioCampanhaFormat = moment(dataInicioCampanhaApi).format('DD/MM/YYYY');

    let dataFimCampanhaApi = moment(String(item.data_fim_campanha).substring(0, 10)).format('YYYY-MM-DD');
    let dataFimCampanhaFormat = moment(dataFimCampanhaApi).format('DD/MM/YYYY');

    this.periodoCampanhaSelecionado = "De " + String(dataInicioCampanhaFormat) + " Até " + String(dataFimCampanhaFormat);
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

  filtraCampanhaPerfilSmartTable(event) {
    let find = _.find(this.perfisCampanha, (o: any) => {
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

  changeComponent(component) {
    this.popover.content = component;
    this.popover.rebuild();
  }

}
