import { Component, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { NbThemeService, NbTreeGridDataSourceBuilder, NbTreeGridDataSource, NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
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
import { NbSortDirection, NbSortRequest } from '@nebular/theme';
import config from 'devextreme/core/config';


interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

interface TreeNode<T> {
  data: T;
}

interface FSEntry {
  nome_agrupamento: string;
  meta_total_campanha: number;
}

export class Agrupador {
  codigo_instituicao: number;
  codigo_produto_corban: number;
  meta_diaria: number;
  meta_producao: number;
  nivel_atingimento: number;
  nome_instituicao: string;
  nome_produto_corban: string;
  nota_nivel_atingido: number;
  percentual_atingimento: number;
  projecao: number;
  qtd_elegivel_seguro: number;
  qtd_realizado_seguro: number;
  qtd_total_contratos_campanha: number;
  ticket_medio: number;
  tipo_operacao: string;
  valor_atingido_meta_producao: number;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard-campanha.component.scss'],
  templateUrl: './dashboard-campanha.component.html',
})
export class DashboardCampanhaComponent implements OnDestroy {

  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;
  @ViewChild('list', { read: TemplateRef }) templateList: TemplateRef<any>;

  private alive = true;

  solarValue: number;

  espacoNivel = [];
  qtd: any;

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
      codigo: 0,
    },
    produto: {
      label: 'Produto',
      codigo: 0,
    },
  };

  settingsLojas = {
    hideSubHeader: true,
    prop: {
      filter: false,
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      nome_agrupamento: {
        title: 'Lojas',
        type: 'string',
        filter: false,
        sortDirection: 'asc',
      },
      meta_total_campanha: {
        title: 'Meta Total',
        type: 'number',
        filter: false,
      },
      atingimento_total_campanha: {
        title: 'Atingido',
        type: 'number',
        filter: false,
      },
      perc_atingimento_total_campanha: {
        title: '% Atingido',
        type: 'number',
        filter: false,
      },
      ticket_medio_campanha: {
        title: 'Ticket Médio',
        type: 'number',
        filter: false,
      },
      meta_diaria_campanha: {
        title: 'Meta Diária',
        type: 'number',
        filter: false,
      },
      meta_recalculada: {
        title: 'Meta Recalculada',
        type: 'number',
        filter: false,
      },
      projecao_total_campanha: {
        title: 'Total campanha projetado',
        type: 'number',
        filter: false,
      },
      total_hc_participantes: {
        title: 'HC',
        type: 'number',
        filter: false,
      },
    },
    defaultStyle: true,
    attr: {
      class: 'table table-bordered', // this is custom table scss or css class for table
    },
  };

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  customColumn = 'Lojas';
  defaultColumns = ['Nome agrupamento'];
  hc_total_campanha = 0;


  key: string = 'nome'; // Define um valor padrão, para quando inicializar o componente
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
    this.dadosCampanhaMetasSmartTable.sort(function (a, b) { return a.string(this.key) - b.string(this.key); });
  }

  allColumns = [this.customColumn, ...this.defaultColumns];

  settingsPromotores = {
    hideSubHeader: true,
    prop: {
      filter: false,
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      nome_agrupamento: {
        title: 'Consultores',
        type: 'string',
        filter: false,
      },
      meta_total_campanha: {
        title: 'Meta Total',
        type: 'number',
        filter: false,
      },
      atingimento_total_campanha: {
        title: 'Atingido',
        type: 'number',
        filter: false,
      },
      perc_atingimento_total_campanha: {
        title: '% Atingido',
        type: 'number',
        filter: false,
      },
      ticket_medio_campanha: {
        title: 'Ticket Médio',
        type: 'number',
        filter: false,
      },
      meta_diaria_campanha: {
        title: 'Meta Diária',
        type: 'number',
        filter: false,
      },
      meta_recalculada: {
        title: 'Meta Recalculada',
        type: 'number',
        filter: false,
      },
      projecao_total_campanha: {
        title: 'Total campanha projetado',
        type: 'number',
        filter: false,
      },
      total_hc_participantes: {
        title: 'HC',
        type: 'number',
        filter: false,
      },
    },
  };

  dadosCampanhaMetasSmartTable = [];

  source: LocalDataSource = new LocalDataSource();
  dataSource: NbTreeGridDataSource<FSEntry>;

  chartOptions: any = {};

  campanhaSelecionada: any;
  campanhasPerfil = [];
  contratosPagos = [];
  contratosDigitados = [];
  datasHoje = [];
  datasOntem = [];
  contratosPagosSinteticos = {
    'qtd_total_digitado': 0,
    'qtd_total_pago': 0,
    'relacao_qtd_digitado_pago': 0,
    'relacao_valor_digitado_pago': 0,
    'valor_elegivel_total_digitado': 0,
    'valor_elegivel_total_pago': 0,
    'ano_campanha_inicial': 0,
    'mes_campanha_inicial': 0,
    'length': 0,
  };
  campanhaDias = 0;
  campanhaPendencias = 0;
  campanhaDiasUteisCorridos = 0;
  ticketPerfil = 0;
  ticketGlobal = 0;
  porcentagemMetas = 0;
  dadosCampanhaMetas = [];
  dadosCampanhaMetasTotalizador = [];

  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;

  dadosProdutoCorbanCampanha = [];
  dadosCampanhaMetasLoadCampanhas = true;
  dadosCampanhaMetasLoad = true;
  perfis = [
    {
      id: 4,
      label: 'Regional',
    },
    {
      id: 3,
      label: 'Comercial',
    },
    {
      id: 2,
      label: 'Loja',
    },
    {
      id: 1,
      label: 'Promotor',
    },
  ];

  perfisCampanha = [
    {
      id: 2,
      label: 'LOJAS',
    },
    {
      id: 1,
      label: 'CONSULTORES',
    },
    {
      id: 4,
      label: 'REGIONAIS',
    },
  ];

  //perfilAtivo = window.sessionStorage.codigo_perfil_atuacao;
  perfilAtivo = 2;

  mes = [
    {
      id: 1,
      label: 'Jan',
      mesExtenso: 'Janeiro',
    },
    {
      id: 2,
      label: 'Fev',
      mesExtenso: 'Fevereiro',
    },
    {
      id: 3,
      label: 'Mar',
      mesExtenso: 'Março',
    },
    {
      id: 4,
      label: 'Abr',
      mesExtenso: 'Abril',
    },
    {
      id: 5,
      label: 'Mai',
      mesExtenso: 'Maio',
    },
    {
      id: 6,
      label: 'Jun',
      mesExtenso: 'Junho',
    },
    {
      id: 7,
      label: 'Jul',
      mesExtenso: 'Julho',
    },
    {
      id: 8,
      label: 'Ago',
      mesExtenso: 'Agosto',
    },
    {
      id: 9,
      label: 'Set',
      mesExtenso: 'Setembro',
    },
    {
      id: 10,
      label: 'Out',
      mesExtenso: 'Outubro',
    },
    {
      id: 11,
      label: 'Nov',
      mesExtenso: 'Novembro',
    },
    {
      id: 12,
      label: 'Dez',
      mesExtenso: 'Dezembro',
    },
  ];

  revealed = {
    campanhas: false,
    chart: true,
    metasCampanhas: true,
    produtoxsxCorbans: true,
  };

  option: any = {};
  themeSubscription: any;

  hoje: any = moment(Date.now());
  ontem: any = new Date();

  dataAtual = new Date(this.hoje);
  anoVigente = this.dataAtual.getFullYear();
  mesVigente = this.dataAtual.getMonth() + 1;

  ativaBotaoLojaTableSmart = false;
  ativaBotaoPromotoresTableSmart = false;
  ativaBotaoRegionaisTableSmart = false;
  nomeLojaSelecionada = '';
  nomePromotorSelecionado = '';
  nomeRegionalSelecionado = '';

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.ontem.setDate(this.ontem.getDate() - 1);
  }

  ordem = {
    campanhas: {
      codigo_campanha: 'asc',
      nome_campanha: 'asc',
      data_inicio_campanha: 'asc',
      data_fim_campanha: 'asc',
    },
    metas: {
      nome_agrupamento: 'asc',
      nivel_atingimento_campanha: 'asc',
      meta_total_campanha: 'asc',
      atingimento_total_campanha: 'asc',
      meta_diaria_campanha: 'asc',
      projecao_total_campanha: 'asc',
      ticket_medio_campanha: 'asc',
      total_hc_participantes: 'asc',
    },
    produtos: {
      nome_produto_corban: 'asc',
      valor_atingido_meta_producao_produto_corban: 'asc',
      nivel_atingimento_produto_corban: 'asc',
      projecao_produto_corban: 'asc',
      meta_diaria_produto_corban: 'asc',
      ticket_medio_produto_corban: 'asc',
      percentual_atingido_produto_corban: 'asc',
    },
  };

  dadosProdutosCorban = {
    'codigo_produto_corban': 0,
    'meta_diaria_produto_corban': 0,
    'meta_producao_produto_corban': 0,
    'nivel_atingimento_produto_corban': 0,
    'nome_produto_corban': '',
    'nota_nivel_atingido': 0,
    'percentual_atingido_produto_corban': 0,
    'projecao_produto_corban': 0,
    'qtd_elegivel_seguro': 0,
    'qtd_realizado_seguro': 0,
    'qtd_total_contratos_campanha': 0,
    'ticket_medio_produto_corban': 0,
    'valor_atingido_meta_producao_produto_corban': 0,
  };

  codigos = {
    codigo_regional: '',
    codigo_comercial: '',
    codigo_loja: '',
    codigo_funcionario: '',
  };

  gridDadosCampanhaGrid: any;
  gridDadosCampanhaPivotGrid: any;

  banda1Campanha: String;
  banda2PendenciaFisico: String;
  mesAA: string;
  mesA: string;
  anoAtual: string;
  anoPassado: string;

  constructor(
    private themeService: NbThemeService,
    private campanhasApiService: CampanhasApiService,
    private diasUteisPeriodoApiService: DiasUteisPeriodoApiService,
    private ticketMedioApiService: TicketMedioApiService,
    private indiceContratosDigitadosApiService: IndiceContratosDigitadosApiService,
    private toastrService: NbToastrService
  ) {

    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });
    config({ decimalSeparator: ',', thousandsSeparator: '.' });
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
          return String(
            `${i.ano}-${str_pad(i.mes, 2, 0, 'STR_PAD_LEFT')}-${str_pad(i.dia, 2, 0, 'STR_PAD_LEFT')}`) === String(val);
        });
        if (!find) {
          datas.push(`${i.ano}-${str_pad(i.mes, 2, 0, 'STR_PAD_LEFT')}-${str_pad(i.dia, 2, 0, 'STR_PAD_LEFT')}`);
        }
      }

      for (let i of datas) {
        let find = _.find(this.contratosDigitados, (o: any) => {
          return String(i) === String(
            `${o.ano}-${str_pad(o.mes, 2, 0, 'STR_PAD_LEFT')}-${str_pad(o.dia, 2, 0, 'STR_PAD_LEFT')}`);
        });
        if (!find) {
          digitados.push(0);
        } else {
          digitados.push(find.total_valor_elegivel);
        }
        find = _.find(this.contratosPagos, (o: any) => {
          return String(i) === String(
            `${o.ano}-${str_pad(o.mes, 2, 0, 'STR_PAD_LEFT')}-${str_pad(o.dia, 2, 0, 'STR_PAD_LEFT')}`);
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
                    'Valores ' + params.value +
                    (params.seriesData.length ? ' ： ' + 'R$ ' +
                      number_format(params.seriesData[0].data, 2, ',', '.') : '')
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
                    'Valores ' + params.value +
                    (params.seriesData.length ? ' ： ' + 'R$ ' +
                      number_format(params.seriesData[0].data, 2, ',', '.') : '')
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
  }

  findCampanha() {
    this.dadosCampanhaMetasLoadCampanhas = true;
    this.campanhasPerfil = [];
    this.dadosCampanhaMetas = [];
    this.campanhasApiService.perfil()
      .then((s) => {
        this.campanhasPerfil = s;
        if (this.campanhasPerfil.length === 0) {
          this.dadosCampanhaMetasLoadCampanhas = false;
          this.dadosCampanhaMetasLoad = false;
        } else {
          this.dadosCampanhaMetasLoadCampanhas = true;
          this.atualizarFiltro(this.campanhasPerfil[0]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  calculateCellValue(data) {
    return [data.agrupador].join(" ");
  }

  findCampanhaMeta(visao) {
    this.dadosCampanhaMetasLoad = true;
    this.dadosCampanhaMetas = [];
    this.dadosProdutoCorbanCampanha = [];
    this.dadosCampanhaMetasSmartTable = [];
    this.campanhasApiService.metas(
      {
        'codigo_campanha': this.filtro.campanha.codigo,
        'visao': visao,
        'codigo_regional': this.codigos.codigo_regional,
        'codigo_comercial': this.codigos.codigo_comercial,
        'codigo_loja': this.codigos.codigo_loja,
        'codigo_funcionario': this.codigos.codigo_funcionario,
      }
    )
      .then((s) => {
        this.dadosCampanhaMetasSmartTable = [];
        this.dadosCampanhaMetasTotalizador = s.dados_campanha_sintetico;
        this.dadosCampanhaMetas = s.dados_campanha;
        this.hc_total_campanha = s.hc_total_campanha;
        if (this.dadosCampanhaMetas.length == 0) {
          this.dadosCampanhaMetasLoad = false;
        } else {
          this.dadosCampanhaMetasLoad = false;
          this.findCampanhaMetaSmartTable(visao);
          this.gridCampanhas(s);
          this.findDadosProdutoCorbanCampanha(this.dadosCampanhaMetas[0]);
        }
      })
      .catch((e) => {
        console.log(e);
        this.dadosCampanhaMetasLoad = false;
      });
  }

  gridCampanhas(dadosCampanha) {
    let caption = dadosCampanha.caption_fisico;
    let Dados = dadosCampanha.dados_campanha_sintetico;
    let gridAdd: any = [];

    this.banda1Campanha = this.nomeCampanhaSelecionado;
    this.banda2PendenciaFisico = 'Pendência de Físico';

    this.mesAA = caption[0];
    this.mesA = caption[1];
    this.anoAtual = caption[2];
    this.anoPassado = caption[3];

    this.gridDadosCampanhaGrid = Dados;

    for (var y = 0; y < Dados.length; y++) {
      let valor = Dados[y];
      gridAdd.push(
        {
          agrupador: valor.agrupador,
          atingido: parseFloat(parseFloat(valor.atingido).toFixed(2)),
          atingimento_projetado: parseFloat(parseFloat(valor.atingimento_projetado).toFixed(2)),
          codigo_instituicao: valor.codigo_instituicao,
          codigo_produto_corban: valor.codigo_produto_corban,
          fisico_e_am_0: valor.fisico_e_am_0,
          fisico_e_am_1: valor.fisico_e_am_1,
          fisico_e_am_2: valor.fisico_e_am_2,
          fisico_e_am_3: valor.fisico_e_am_3,
          fisico_e_p_0: valor.fisico_e_p_0,
          fisico_e_p_1: valor.fisico_e_p_1,
          fisico_e_p_2: valor.fisico_e_p_2,
          fisico_e_p_3: valor.fisico_e_p_3,
          fisico_r_am_0: valor.fisico_r_am_0,
          fisico_r_am_1: valor.fisico_r_am_1,
          fisico_r_am_2: valor.fisico_r_am_2,
          fisico_r_am_3: valor.fisico_r_am_3,
          fisico_r_p_0: valor.fisico_r_p_0,
          fisico_r_p_1: valor.fisico_r_p_1,
          fisico_r_p_2: valor.fisico_r_p_2,
          fisico_r_p_3: valor.fisico_r_p_3,
          folha: valor.folha,
          meta: parseFloat(parseFloat(valor.meta).toFixed(2)),
          meta_du: parseFloat(parseFloat(valor.meta_du).toFixed(2)),
          meta_du_recalculado: parseFloat(parseFloat(valor.meta_du_recalculado).toFixed(2)),
          nivel: valor.nivel,
          nome_instituicao: valor.nome_instituicao,
          nome_produto_corban: valor.nome_produto_corban,
          percentual_atingido: parseFloat(parseFloat(valor.percentual_atingido).toFixed(2)),
          qtd_contratos: parseFloat(parseFloat(valor.qtd_contratos).toFixed(2)),
          ticket_medio: parseFloat(parseFloat(valor.ticket_medio).toFixed(2)),
          tipo_operacao: valor.tipo_operacao
        });

    }
    this.gridDadosCampanhaGrid = gridAdd;
  }

  downloadCSV() {
    this.makeToast('info', 'Aguarde...', 'O Download está sendo feito');
    this.campanhasApiService.imprimirCSV(this.filtro.campanha.codigo).then((s) => {
    })
      .catch((e) => {
        let erro = e.error.message;
        this.makeToast('danger', 'Erro', erro);
        console.log(e)
      });
  }


  findCampanhaMetaSmartTable(visao) {
    this.dadosCampanhaMetasLoad = true;
    this.dadosCampanhaMetasSmartTable = [];
    let datasourcesmart: TreeNode<FSEntry>[];
    this.campanhasApiService.metas(
      {
        'codigo_campanha': this.filtro.campanha.codigo,
        'visao': visao,
        'codigo_regional': this.codigos.codigo_regional,
        'codigo_comercial': this.codigos.codigo_comercial,
        'codigo_loja': this.codigos.codigo_loja,
        'codigo_funcionario': this.codigos.codigo_funcionario,
      }
    )
      .then((s) => {
        this.gridCampanhas(s);
        this.dadosCampanhaMetasSmartTable = [];
        this.dadosCampanhaMetasSmartTable = s.dados_campanha;

        /*for (let i of s.dados_campanha) {
          this.dadosCampanhaMetasSmartTable.push(
            {
              codigo_agrupamento: i.codigo_agrupamento,
              nome_agrupamento: String(i.nome_agrupamento),
              meta_total_campanha: parseFloat(i.meta_total_campanha),
              atingimento_total_campanha: parseFloat(i.atingimento_total_campanha),
              perc_atingimento_total_campanha:
                parseFloat((((i.atingimento_total_campanha).toFixed(2)
                  / (i.meta_total_campanha).toFixed(2)) * 100).toFixed(2)),
              ticket_medio_campanha: parseFloat(parseFloat(i.ticket_medio_campanha).toFixed(0)),
              meta_diaria_campanha: parseFloat((parseFloat(i.meta_total_campanha) / this.campanhaDias).toFixed(0)),
              meta_recalculada:
                parseFloat((((parseFloat(i.meta_total_campanha.toFixed(2)))
                  - parseFloat(i.atingimento_total_campanha.toFixed(2))) / this.campanhaPendencias)
                  .toFixed(0)),
              projecao_total_campanha: parseFloat(parseFloat(i.projecao_total_campanha).toFixed(0)),
              total_hc_participantes: i.total_hc_participantes,
            })
        }*/

        //this.source.load(this.dadosCampanhaMetasSmartTable);
        this.dadosCampanhaMetasLoad = false;
        if (this.dadosCampanhaMetas.length !== 0) {
          this.findDadosProdutoCorbanCampanha(this.dadosCampanhaMetas[0]);
        }
      }).catch((e) => {
        console.log(e);
        this.dadosCampanhaMetasLoad = false;
      });
  }


  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

  findContratos() {
    this.datasHoje = [];
    this.datasOntem = [];
    this.contratosPagos = [];
    this.contratosDigitados = [];
    this.indiceContratosDigitadosApiService.pagos({
      'codigo_campanha': this.filtro.campanha.codigo,
      'codigo_regional': this.codigos.codigo_regional,
      'codigo_comercial': this.codigos.codigo_comercial,
      'codigo_loja': this.codigos.codigo_loja,
      'codigo_funcionario': this.codigos.codigo_funcionario,
      'data': ''
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
            'codigo_campanha': this.filtro.campanha.codigo,
            'data': this.hoje,
            'codigo_comercial': this.codigos.codigo_comercial,
            'codigo_regional': this.codigos.codigo_regional,
            'codigo_loja': this.codigos.codigo_loja,
            'codigo_funcionario': this.codigos.codigo_funcionario,
          })
            .then((c) => {
              this.datasHoje = c;
            })
            .catch((e) => {
              console.log(e);
            });

          this.indiceContratosDigitadosApiService.pagos({
            'codigo_campanha': this.filtro.campanha.codigo,
            'data': this.ontem,
            'codigo_comercial': this.codigos.codigo_comercial,
            'codigo_regional': this.codigos.codigo_regional,
            'codigo_loja': this.codigos.codigo_loja,
            'codigo_funcionario': this.codigos.codigo_funcionario,
          })
            .then((d) => {
              this.datasOntem = d;
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          this.datasOntem = [];
          this.datasHoje = [];
        }
      })
      .catch((e) => {
        console.log(e);
      });

    this.contratosPagosSinteticos = {
      'qtd_total_digitado': 0,
      'qtd_total_pago': 0,
      'relacao_qtd_digitado_pago': 0,
      'relacao_valor_digitado_pago': 0,
      'valor_elegivel_total_digitado': 0,
      'valor_elegivel_total_pago': 0,
      'ano_campanha_inicial': 0,
      'mes_campanha_inicial': 0,
      'length': 0,
    };
    this.indiceContratosDigitadosApiService.sintetico({
      'codigo_campanha': this.filtro.campanha.codigo,
      'codigo_regional': this.codigos.codigo_regional,
      'codigo_comercial': this.codigos.codigo_comercial,
      'codigo_loja': this.codigos.codigo_loja,
      'codigo_funcionario': this.codigos.codigo_funcionario,
    })
      .then((s) => {
        for (const i of s) {
          this.contratosPagosSinteticos = i;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findDiasUteis() {
    this.diasUteisPeriodoApiService.periodo(
      {
        'data_inicial': this.campanhaSelecionada.data_inicio_campanha,
        'data_final': this.campanhaSelecionada.data_fim_campanha,
      },
    )
      .then((s) => {
        this.campanhaDias = s.qtd_dias_uteis;
      })
      .catch((e) => {
        console.log(e);
      });

    this.diasUteisPeriodoApiService.periodo(
      {
        'data_inicial': moment().format('YYYY-MM-DD'),
        'data_final': this.campanhaSelecionada.data_fim_pendencia_fisico,
      },
    )
      .then((s) => {
        this.campanhaPendencias = s.qtd_dias_uteis;
      })
      .catch((e) => {
        console.log(e);
      });

    var month = new Date();
    var valor = this.campanhaSelecionada.data_inicio_campanha.substring(0, 10);
    var monthCampanha = new Date(valor);
    monthCampanha.setDate(monthCampanha.getDate() + 1);
    var MesCorrente = this.mes[month.getMonth()].id;
    var MesCampanha = this.mes[monthCampanha.getMonth()].id;

    if (MesCorrente == MesCampanha) {
      this.diasUteisPeriodoApiService.periodo(
        {
          'data_inicial': this.campanhaSelecionada.data_inicio_campanha,
          'data_final': moment().format('YYYY-MM-DD'),
        },
      )
        .then((s) => {
          this.campanhaDiasUteisCorridos = s.qtd_dias_uteis;
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      this.diasUteisPeriodoApiService.periodo(
        {
          'data_inicial': this.campanhaSelecionada.data_inicio_campanha,
          'data_final': this.campanhaSelecionada.data_fim_campanha,
        },
      )
        .then((s) => {
          this.campanhaDiasUteisCorridos = s.qtd_dias_uteis;
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  findTickets() {
    this.ticketPerfil = 0;
    this.ticketGlobal = 0;
    this.ticketMedioApiService.perfil({
      'codigo_campanha': this.filtro.campanha.codigo,
      'codigo_regional': this.codigos.codigo_regional,
      'codigo_comercial': this.codigos.codigo_comercial,
      'codigo_loja': this.codigos.codigo_loja,
      'codigo_funcionario': this.codigos.codigo_funcionario,
    })
      .then((s) => {
        this.ticketPerfil = s.ticket_medio_perfil;
      })
      .catch((e) => {
        console.log(e);
      });
    this.ticketMedioApiService.global({
      'codigo_campanha': this.filtro.campanha.codigo,
      'codigo_regional': this.codigos.codigo_regional,
      'codigo_comercial': this.codigos.codigo_comercial,
      'codigo_loja': this.codigos.codigo_loja,
      'codigo_funcionario': this.codigos.codigo_funcionario,
    })
      .then((s) => {
        this.ticketGlobal = s.ticket_medio_global;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  atualizarFiltro(item) {
    if (item.codigo_campanha !== 0) {
      this.filtro.campanha.codigo = item.codigo_campanha;
      this.nomeCampanhaSelecionado = item.nome_campanha;

      let dataInicioCampanhaApi = moment(String(item.data_inicio_campanha).substring(0, 10)).format('YYYY-MM-DD');
      let dataInicioCampanhaFormat = moment(dataInicioCampanhaApi).format('DD/MM/YYYY');

      let dataFimCampanhaApi = moment(String(item.data_fim_campanha).substring(0, 10)).format('YYYY-MM-DD');
      let dataFimCampanhaFormat = moment(dataFimCampanhaApi).format('DD/MM/YYYY');

      // tslint:disable-next-line: max-line-length
      this.periodoCampanhaSelecionado = 'De ' + String(dataInicioCampanhaFormat) + ' Até ' + String(dataFimCampanhaFormat);
      this.campanhaSelecionada = item;
      this.findContratos();
      this.findDiasUteis();
      this.findTickets();
      this.findCampanhaMeta(this.perfilAtivo);
    }
  }

  filtraCampanhaPerfil(event) {
    this.findDiasUteis();
    const find = _.find(this.perfis, (o: any) => {
      return String(o.label) === String(event.tabTitle);
    });
    this.perfilAtivo = find.id;
    this.findCampanhaMeta(find.id);
    //this.perfilAtivo = window.sessionStorage.codigo_perfil_atuacao;
  }

  filtraCampanhaPerfilSmartTable(event) {
    const find = _.find(this.perfisCampanha, (o: any) => {
      return String(o.label) === String(event.tabTitle);
    });
    this.perfilAtivo = find.id;
    this.findCampanhaMetaSmartTable(find.id);
    //this.findCampanhaMeta(find.id);
    //this.perfilAtivo = window.sessionStorage.codigo_perfil_atuacao;
  }

  clickSmartTableLojas(event) {
    //const codigoAgrupamento = _.find(this.dadosCampanhaMetasSmartTable, (o: any) => {
    //  return String(o.nome_agrupamento) === String(event.data.nome_agrupamento);
    //});
    this.nomeLojaSelecionada = event.nome_agrupamento;
    this.ativaBotaoLojaTableSmart = true;
    this.findDadosProdutoCorbanCampanhaFiltro(event.codigo_agrupamento, 2);
  }

  clickSmartTableRegionais(event) {
    //const codigoAgrupamento = _.find(this.dadosCampanhaMetasSmartTable, (o: any) => {
    //  return String(o.nome_agrupamento) === String(event.data.nome_agrupamento);
    //});
    this.nomeRegionalSelecionado = event.nome_agrupamento;
    this.ativaBotaoRegionaisTableSmart = true;
    this.findDadosProdutoCorbanCampanhaFiltro(event.codigo_agrupamento, 4);
  }

  clickSmartTablePromotores(event) {
    //const codigoAgrupamento = _.find(this.dadosCampanhaMetasSmartTable, (o: any) => {
    //  return String(o.nome_agrupamento) === String(event.data.nome_agrupamento);
    //});
    this.nomePromotorSelecionado = event.nome_agrupamento;
    this.ativaBotaoPromotoresTableSmart = true;
    this.findDadosProdutoCorbanCampanhaFiltro(event.codigo_agrupamento, 1);
  }

  clickSmartTableLimpar(filtro) {
    /*const codigoAgrupamento = _.find(this.dadosCampanhaMetasSmartTable, (o: any) => {
      return String(o.nome_agrupamento) === String(event.data.nome_agrupamento);
    });*/
    //this.findDadosProdutoCorbanCampanhaFiltro(filtro, 1);
    if (filtro === 1) {
      this.nomePromotorSelecionado = '';
      this.ativaBotaoPromotoresTableSmart = false;
      this.codigos.codigo_funcionario = '';
      if (this.ativaBotaoLojaTableSmart) {
        this.findContratos();
        this.findTickets();
        this.findCampanhaMeta(2);
      } else {
        this.findContratos();
        this.findTickets();
        this.findCampanhaMeta(this.perfilAtivo);
      }
    }

    if (filtro === 2) {
      this.nomeLojaSelecionada = '';
      this.ativaBotaoLojaTableSmart = false;
      this.codigos.codigo_loja = '';
      if (this.ativaBotaoPromotoresTableSmart) {
        this.findContratos();
        this.findTickets();
        this.findCampanhaMeta(1);
      } else {
        this.findContratos();
        this.findTickets();
        this.findCampanhaMeta(this.perfilAtivo);
      }
    }

    if (filtro === 4) {
      this.nomeRegionalSelecionado = '';
      this.ativaBotaoRegionaisTableSmart = false;
      this.codigos.codigo_regional = '';
      if (this.ativaBotaoPromotoresTableSmart) {
        this.findContratos();
        this.findTickets();
        this.findCampanhaMeta(4);
      } else {
        this.findContratos();
        this.findTickets();
        this.findCampanhaMeta(this.perfilAtivo);
      }
    }
  }

  findDadosProdutoCorbanCampanhaFiltro(codigo_agrupamento, visao) {
    this.dadosProdutoCorbanCampanha = codigo_agrupamento;

    if (visao === 4) {
      this.codigos.codigo_regional = String(codigo_agrupamento);
    }

    if (visao === 3) {
      this.codigos.codigo_comercial = String(codigo_agrupamento);
    }

    if (visao === 2) {
      this.codigos.codigo_loja = String(codigo_agrupamento);
    }

    if (visao === 1) {
      this.codigos.codigo_funcionario = String(codigo_agrupamento);
    }

    this.findContratos();
    this.findTickets();
    this.findCampanhaMeta(visao);
  }

  findDadosProdutoCorbanCampanha(item) {
    this.filtro.produto.codigo = item.codigo_agrupamento;
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

  makeToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 5000,
      hasIcon: true,
      position: this.position,
      preventDuplicates: true,
    };
    const titleContent = title ? `${title}` : '';

    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }

  changeComponent(component) {
    this.popover.content = component;
    this.popover.rebuild();
  }
}
