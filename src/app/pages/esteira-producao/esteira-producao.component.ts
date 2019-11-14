import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { NbSortDirection, NbTreeGridDataSource, NbGlobalPhysicalPosition, NbSearchService, NbToastrService, NbComponentStatus, NbGlobalPosition } from '@nebular/theme';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { EsteiraProducaoApiService } from '../../api/esteira-producao';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import _ from 'lodash';
import 'style-loader!angular2-toaster/toaster.css';
import { Subscription } from 'rxjs';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

interface IndicadoresSettings {
  type: string;
}

export class CustomModalOptions {
  cpf_cliente: number;
}

@Component({
  selector: 'ngx-esteira-producao',
  templateUrl: './esteira-producao.component.html',
  styleUrls: ['./esteira-producao.component.scss'],
  providers: [CustomModalOptions]
})

export class EsteiraProducaoComponent implements OnInit, OnDestroy {

  //@Output() childIsOpen = new EventEmitter<boolean>();
  closeResult: string;
  modalReference: NgbModalRef;

  index = 1;
  destroyByClick = true;
  duration = 5000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = true;
  status: NbComponentStatus = 'success';
  titulo: string = 'Sucesso';
  mensagem: string = 'Ação realizada com sucesso!';
  pararSpinner: boolean = true;

  revealed = {
    regional: false,
    comercial: false,
    funcionario: false,
    loja: false,
    lojaMatriz: false,
    canalVendas: false,
    tipoPendencia: false,
    instituicao: false
  }

  ativaBotaoComercial = false;
  ativaBotaoRegional = false;
  ativaBotaoLoja = false;
  ativaBotaoLojaMatriz = false;
  ativaBotaoFuncionario = false;
  ativaBotaocanalVendas = false;
  ativaBotaoBordero = false;
  ativaBotaoInstituicao = false;

  codigoComercial = '';
  codigoInstituicao = '';
  codigoRegional = '';
  codigoLoja = '';
  codigoLojaMatriz = '';
  codigoFuncionario = '';
  codigoCanalVendas = '';
  codigoBordero = '';
  digitoBordero = '';
  nomeComercial = '';
  nomeRegional = '';
  nomeLoja = '';
  nomeInstituicao = '';
  nomeFuncionario = '';
  nomeLojaMatriz = '';
  nomeCanalVendas = '';

  private alive = true;
  flipped = false;
  on = false;
  solarValue: number;
  statusCards: string;
  commonStatusCardsSet: CardSettings[] = [];
  Prioridade1Settings: IndicadoresSettings = {
    type: 'danger',
  };
  Prioridade2Settings: IndicadoresSettings = {
    type: 'primary',
  };
  Prioridade3Settings: IndicadoresSettings = {
    type: 'success',
  };
  Prioridade4Settings: IndicadoresSettings = {
    type: 'info',
  };
  Prioridade5Settings: IndicadoresSettings = {
    type: 'warning',
  };

  cpf_cliente: number;
  nome_cliente: string;
  proposta: number;
  codigo_status_agrupado_inconsistencia: number;


  currentPage = 1;
  itemsPerPage = 10;
  pageSize: number;

  statusCardsByThemes: {
    default: CardSettings[];
    dark: CardSettings[];
  } = {
      default: this.commonStatusCardsSet,
      dark: this.commonStatusCardsSet,
    };

  customColumn = 'name';
  defaultColumns = ['size', 'kind', 'items'];
  allColumns = [this.customColumn, ...this.defaultColumns];

  dataSource: NbTreeGridDataSource<any>;

  value = '';

  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  habilitaLimparFiltro: boolean = false;
  propostasInconsistencias = [];
  propostasInconsistenciasC = [];
  comercial = [];
  regional = [];
  funcionario = [];
  loja = [];
  matriz = [];
  instituicao = [];
  canalVendas = [];

  filtropropostasInconsistencias: any;
  indicadores = [];
  indicadoresC = [];
  drillDown = [];
  qtd_total_de_propostas_inconsistentes: number;

  subscriptionEsteira : Subscription;

  constructor(
    private themeService: NbThemeService,
    private EsteiraProducaoApiService: EsteiraProducaoApiService,
    private modalService: NgbModal,
    private searchService: NbSearchService,
    private toastrService: NbToastrService
  ) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });

    this.subscriptionEsteira = this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.value = data.term;
        this.filtroFindPropostasInconsistentesSearch(this.value);
      });

    this.findIndicadores();
    this.findPropostasInconsistentes();
  }

  findIndicadores() {
    this.indicadores = [];
    this.indicadoresC = [];
    this.EsteiraProducaoApiService.indicadores(
      {
        "codigo_instituicao": this.codigoInstituicao,
        "codigo_regional": this.codigoRegional,
        "codigo_comercial": this.codigoComercial,
        "codigo_loja": this.codigoLoja,
        "codigo_matriz": this.codigoLojaMatriz,
        "cpf_funcionario": this.codigoFuncionario,
        "cpf_cliente": ""
      }
    ).then((s) => {
      this.qtd_total_de_propostas_inconsistentes = s.qtd_total_de_propostas_inconsistentes;
      this.indicadores = s.status;
      for (let i of this.indicadores) {
        if (i.prioridade == 1) {
          this.indicadoresC.push(i = {
            ...i,
            "cor": this.Prioridade1Settings.type
          })
        }
        if (i.prioridade == 2) {
          this.indicadoresC.push(i = {
            ...i,
            "cor": this.Prioridade2Settings.type
          })
        }
        if (i.prioridade == 3) {
          this.indicadoresC.push(i = {
            ...i,
            "cor": this.Prioridade3Settings.type
          })
        }
        if (i.prioridade == 4) {
          this.indicadoresC.push(i = {
            ...i,
            "cor": this.Prioridade4Settings.type
          })
        }
        if (i.prioridade == 5) {
          this.indicadoresC.push(i = {
            ...i,
            "cor": this.Prioridade5Settings.type
          })
        }
      }
      this.indicadores = this.indicadoresC;
    })
      .catch((e) => {
        console.log(e)
      });
  }

  findPropostasInconsistentes() {
    this.habilitaLimparFiltro = false;
    this.propostasInconsistencias = [];
    this.pararSpinner = true;
    this.EsteiraProducaoApiService.propostasInconsistentes(
      {
        "codigo_instituicao": this.codigoInstituicao,
        "codigo_regional": this.codigoRegional,
        "codigo_comercial": this.codigoComercial,
        "codigo_loja": this.codigoLoja,
        "codigo_matriz": this.codigoLojaMatriz,
        "cpf_funcionario": this.codigoFuncionario,
        "cpf_cliente": "",
      }
    ).then((s) => {
      this.propostasInconsistencias = s.dados;
      this.comercial = s.agrupado_comercial;
      this.regional = s.agrupado_regional;
      this.funcionario = s.agrupado_funcionario;
      this.loja = s.agrupado_loja;
      this.matriz = s.agrupado_loja_matriz;
      this.canalVendas = s.agrupado_canal_vendas;
      if (s.agrupado_instituicao != null){
        this.instituicao = s.agrupado_instituicao;
      } else {
        this.instituicao = [];
      };
      if (this.propostasInconsistencias.length == 0) {
        this.pararSpinner = false;
      }
      this.setColors();
    })
      .catch((e) => {
        console.log(e)
      });
  }

  toggleView(acao) {
    this.revealed[acao] = !this.revealed[acao];
  }

  setColors() {
    this.propostasInconsistenciasC = [];
    for (let i of this.propostasInconsistencias) {
      if (i.prioridade_status_agrupado_inconsistencia_ == 1) {
        this.propostasInconsistenciasC.push(i = {
          ...i,
          "cor": this.Prioridade1Settings.type
        })
      }
      if (i.prioridade_status_agrupado_inconsistencia_ == 2) {
        this.propostasInconsistenciasC.push(i = {
          ...i,
          "cor": this.Prioridade2Settings.type
        })
      }
      if (i.prioridade_status_agrupado_inconsistencia_ == 3) {
        this.propostasInconsistenciasC.push(i = {
          ...i,
          "cor": this.Prioridade3Settings.type
        })
      }
      if (i.prioridade_status_agrupado_inconsistencia_ == 4) {
        this.propostasInconsistenciasC.push(i = {
          ...i,
          "cor": this.Prioridade4Settings.type
        })
      }
      if (i.prioridade_status_agrupado_inconsistencia_ == 5) {
        this.propostasInconsistenciasC.push(i = {
          ...i,
          "cor": this.Prioridade5Settings.type
        })
      }
    }
    this.propostasInconsistencias = this.propostasInconsistenciasC;
  }

  setColorsDisabled(on, codigo_status_agrupado_inconsistencia) {
    this.indicadoresC = [];
    if (on) {
      for (let i of this.indicadores) {
        if (i.prioridade == codigo_status_agrupado_inconsistencia) {
          if (codigo_status_agrupado_inconsistencia == 1) {
            this.indicadoresC.push(i = {
              ...i,
              "cor": this.Prioridade1Settings.type
            })
          }
          if (codigo_status_agrupado_inconsistencia == 2) {
            this.indicadoresC.push(i = {
              ...i,
              "cor": this.Prioridade2Settings.type
            })
          }
          if (codigo_status_agrupado_inconsistencia == 3) {
            this.indicadoresC.push(i = {
              ...i,
              "cor": this.Prioridade3Settings.type
            })
          }
          if (codigo_status_agrupado_inconsistencia == 4) {
            this.indicadoresC.push(i = {
              ...i,
              "cor": this.Prioridade4Settings.type
            })
          }
          if (codigo_status_agrupado_inconsistencia == 5) {
            this.indicadoresC.push(i = {
              ...i,
              "cor": this.Prioridade5Settings.type
            })
          }
        } else {
          this.indicadoresC.push(i = {
            ...i,
            "cor": "hover"
          })
        }
      }
      this.indicadores = this.indicadoresC;
      this.setColors();
      on = false;
    } else {
      this.setColors();
    }
  }

  filtroFindPropostasInconsistentes(codigo_status_agrupado_inconsistencia) {
    this.propostasInconsistencias = [];
    this.on = !this.on
    if (this.on || this.ativaBotaoFuncionario ||
      this.ativaBotaoComercial ||
      this.ativaBotaoRegional ||
      this.ativaBotaocanalVendas ||
      this.ativaBotaoLoja ||
      this.ativaBotaoLojaMatriz) {
      this.EsteiraProducaoApiService.propostasInconsistentes(
        {
          "codigo_instituicao": this.codigoInstituicao,
          "codigo_regional": this.codigoRegional,
          "codigo_comercial": this.codigoComercial,
          "codigo_loja": this.codigoLoja,
          "codigo_matriz": this.codigoLojaMatriz,
          "cpf_funcionario": this.codigoFuncionario,
          "cpf_cliente": "",
          "codigo_status_agrupado_inconsistencia": codigo_status_agrupado_inconsistencia
        }
      ).then((s) => {
        this.propostasInconsistencias = s.dados;
        this.comercial = s.agrupado_comercial;
        this.regional = s.agrupado_regional;
        this.funcionario = s.agrupado_funcionario;
        this.loja = s.agrupado_loja;
        this.matriz = s.agrupado_loja_matriz;
        this.canalVendas = s.agrupado_canal_vendas;
        if (s.agrupado_instituicao != null){
          this.instituicao = s.agrupado_instituicao;
        } else {
          this.instituicao = [];
        };
        this.setColorsDisabled(this.on, codigo_status_agrupado_inconsistencia);
      })
        .catch((e) => {
          console.log(e)
        });
    } else {
      this.findIndicadores();
      this.findPropostasInconsistentes();
    }
  }

  filtroFindPropostasInconsistentesSearch(proposta) {
    if (proposta != 0) {
      let pendenciaFiltrados = this.propostasInconsistencias.filter(valorContratos => valorContratos.proposta == proposta);
      if (pendenciaFiltrados.length == 0) {
        this.makeToast('warning', 'Filtro Vazio', 'Sem propostas para serem exibidas');
        this.habilitaLimparFiltro = false;
        this.findIndicadores();
        this.findPropostasInconsistentes();
      } else {
        this.propostasInconsistencias = pendenciaFiltrados;
        this.habilitaLimparFiltro = true;
      }
    }
    /*this.EsteiraProducaoApiService.propostasInconsistentes(
      {
        "codigo_regional": this.codigoRegional,
        "codigo_comercial": this.codigoComercial,
        "codigo_loja": this.codigoLoja,
        "codigo_matriz": this.codigoLojaMatriz,
        "cpf_funcionario": this.codigoFuncionario,
        "cpf_cliente": "",
        "proposta": proposta
      }
    ).then((s) => {
      if (s.length > 0) {
        this.propostasInconsistencias = [];
        this.propostasInconsistencias = s.dados;
        this.comercial = s.agrupado_comercial;
        this.regional = s.agrupado_regional;
        this.funcionario = s.agrupado_funcionario;
        this.loja = s.agrupado_loja;
        this.matriz = s.agrupado_loja_matriz;
        this.canalVendas = s.agrupado_canal_vendas;
        this.habilitaLimparFiltro = true;
        this.findIndicadores();
        this.setColors();
      } else {
        this.status = 'danger';
        this.titulo = 'Erro';
        this.mensagem = 'Essa proposta não foi encontrada!';
        this.makeToast(this.status, this.titulo, this.mensagem);
      }
    })
      .catch((e) => {
        this.status = 'danger';
        this.titulo = 'Erro';
        this.mensagem = 'Essa proposta não foi encontrada!';
        this.makeToast(this.status, this.titulo, this.mensagem);
        console.log(e)
      });*/
  }

  copyToClipboard(item) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (item));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }

  redirecionaBmgConsig() {
    window.open("https://www.ibconsigweb.com.br/situacaoContrato.do?method=prepare");
  }

  baseHistorica(modal, cpf, nome) {
    this.cpf_cliente = cpf;
    this.nome_cliente = nome;

    this.modalService.open(modal, {
      size: 'xl'
    });
  }

  marcarResolvida(modal, proposta, codigo_status_agrupado_inconsistencia) {
    this.proposta = proposta;
    this.codigo_status_agrupado_inconsistencia = codigo_status_agrupado_inconsistencia;
    this.modalReference = this.modalService.open(modal, { size: 'xl', backdrop: 'static' })
  }

  JoinAndClose() {
    this.modalReference.close();
    this.findIndicadores();
    this.findPropostasInconsistentes();
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  findFiltroStatus(codigo_status_agrupado_inconsistencia) {
    this.propostasInconsistencias = this.propostasInconsistencias.filter((item) => {
      return item.codigo_status_agrupado_inconsistencia_ == codigo_status_agrupado_inconsistencia;
    });
  }

  makeToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }

  revelar() {
    this.flipped = !this.flipped;
    /*if (!this.flipped &&
      (this.ativaBotaoFuncionario ||
        this.ativaBotaoComercial ||
        this.ativaBotaoRegional ||
        this.ativaBotaoTipoPendencia ||
        this.ativaBotaocanalVendas ||
        this.ativaBotaoLoja ||
        this.ativaBotaoLojaMatriz)) {
      this.atualizaContador(true);
    }*/
  }

  private _filterRegional(value: number, nome?: string, limpar?: boolean): any {
    if (limpar && value == 0) {
      this.ativaBotaoRegional = false;
      this.codigoRegional = "";
      //this.atualizaContador(this.ativaBotaoRegional);
      this.findIndicadores();
      this.findPropostasInconsistentes();
    } else {
      this.ativaBotaoRegional = true;
      const filterValue = value;
      this.nomeRegional = nome;
      this.codigoRegional = String(filterValue);
      //this.atualizaContador(this.ativaBotaoRegional)
      this.findIndicadores();
      let regionaisFiltrados = this.regional.filter(valorRegional => valorRegional.codigo_regional == filterValue);
      let propostasInconsistenciasFiltrados = this.propostasInconsistencias.filter(valorContratos => valorContratos.codigo_regional == filterValue);
      this.regional = regionaisFiltrados;
      this.propostasInconsistencias = propostasInconsistenciasFiltrados;
      this.habilitaFiltrosSecundarios(this.regional);
    }
  }

  private _filterInstituicao(value: number, nome?: string, limpar?: boolean): any {
    if (limpar && value == 0) {
      this.ativaBotaoInstituicao = false;
      this.codigoInstituicao = "";
      this.findIndicadores();
      this.findPropostasInconsistentes();
    } else {
      this.ativaBotaoInstituicao = true;
      const filterValue = value;
      this.nomeInstituicao = nome;
      this.codigoInstituicao = String(filterValue);
      this.findIndicadores();
      let instituicaoFiltrados = this.instituicao.filter(valorInstituicao => valorInstituicao.codigo_instituicao == filterValue);
      let propostasInconsistenciasFiltrados = this.propostasInconsistencias.filter(valorContratos => valorContratos.codigo_instituicao == filterValue);
      this.instituicao = instituicaoFiltrados;
      this.propostasInconsistencias = propostasInconsistenciasFiltrados;
      this.habilitaFiltrosSecundarios(this.instituicao);
    }
  }

  private _filterComercial(value: number, nome?: string, limpar?: boolean): any {
    if (limpar && value == 0) {
      this.ativaBotaoComercial = false;
      this.codigoComercial = "";
      //this.atualizaContador(this.ativaBotaoComercial);
      this.findIndicadores();
      this.findPropostasInconsistentes();
    } else {
      const filterValue = value;
      this.ativaBotaoComercial = true;
      this.codigoComercial = String(filterValue);
      this.nomeComercial = nome;
      //this.atualizaContador(this.ativaBotaoComercial)
      this.findIndicadores();
      let comerciaisFiltrados = this.comercial.filter(valorComercial => valorComercial.codigo_comercial == filterValue);
      let propostasInconsistenciasFiltrados = this.propostasInconsistencias.filter(valorContratos => valorContratos.codigo_comercial == filterValue);
      this.comercial = comerciaisFiltrados;
      this.propostasInconsistencias = propostasInconsistenciasFiltrados;
      this.habilitaFiltrosSecundarios(this.comercial);
    }
  }

  private _filterLoja(value: number, nome?: string, limpar?: boolean): any {
    if (limpar && value == 0) {
      this.ativaBotaoLoja = false;
      this.codigoLoja = "";
      //this.atualizaContador(this.ativaBotaoLoja);
      this.findIndicadores();
      this.findPropostasInconsistentes();
    } else {
      const filterValue = value;
      this.codigoLoja = String(filterValue);
      this.nomeLoja = nome;
      this.ativaBotaoLoja = true;
      //this.atualizaContador(this.ativaBotaoLoja);
      this.findIndicadores();
      let lojasFiltrados = this.loja.filter(valorLoja => valorLoja.codigo_loja == filterValue);
      let propostasInconsistenciasFiltrados = this.propostasInconsistencias.filter(valorContratos => valorContratos.chave_loja == filterValue);
      this.loja = lojasFiltrados;
      this.propostasInconsistencias = propostasInconsistenciasFiltrados;
      this.habilitaFiltrosSecundarios(this.loja);
    }
  }

  private _filterLojaMatriz(value: number, nome?: string, limpar?: boolean): any {
    if (limpar && value == 0) {
      this.ativaBotaoLojaMatriz = false;
      this.codigoLojaMatriz = "";
      //this.atualizaContador(this.ativaBotaoLoja);
      this.findIndicadores();
      this.findPropostasInconsistentes();
    } else {
      const filterValue = value;
      this.codigoLojaMatriz = String(filterValue);
      this.nomeLojaMatriz = nome;
      this.ativaBotaoLojaMatriz = true;
      //this.atualizaContador(this.ativaBotaoLoja);
      this.findIndicadores();
      let lojasMatrizFiltrados = this.matriz.filter(valorLojaMatriz => valorLojaMatriz.codigo_loja_matriz == filterValue);
      let propostasInconsistenciasFiltrados = this.propostasInconsistencias.filter(valorContratos => valorContratos.codigo_matriz == filterValue);
      this.matriz = lojasMatrizFiltrados;
      this.propostasInconsistencias = propostasInconsistenciasFiltrados;
      this.habilitaFiltrosSecundarios(this.matriz);
    }
  }

  private _filterFuncionario(value: number, nome?: string, limpar?: boolean): any {
    if (limpar && value == 0) {
      this.ativaBotaoFuncionario = false;
      this.codigoFuncionario = "";
      //this.atualizaContador(this.ativaBotaoFuncionario);
      this.findIndicadores();
      this.findPropostasInconsistentes();
    } else {
      const filterValue = value;
      this.ativaBotaoFuncionario = true;
      this.codigoFuncionario = String(filterValue);
      this.nomeFuncionario = nome;
      //this.atualizaContador(this.ativaBotaoFuncionario);
      this.findIndicadores();
      let funcionariosFiltrados = this.funcionario.filter(valorFuncionario => valorFuncionario.codigo_funcionario == filterValue);
      let propostasInconsistenciasFiltrados = this.propostasInconsistencias.filter(valorContratos => valorContratos.codigo_funcionario == filterValue);
      this.funcionario = funcionariosFiltrados;
      this.propostasInconsistencias = propostasInconsistenciasFiltrados;
      this.habilitaFiltrosSecundarios(this.funcionario);
    }
  }

  private _filtercanalVendas(value: number, nome?: string, limpar?: boolean): any {
    if (limpar && value == 0) {
      this.ativaBotaocanalVendas = false;
      this.codigoCanalVendas = "";
      this.findIndicadores();
      this.findPropostasInconsistentes();
    } else {
      const filterValue = value;
      this.ativaBotaocanalVendas = true;
      this.codigoCanalVendas = String(filterValue);
      this.nomeCanalVendas = nome;
      //this.atualizaContador(this.ativaBotaoFuncionario);
      this.findIndicadores();
      let canalVendasFiltrados = this.canalVendas.filter(valorCanalVendas => valorCanalVendas.codigo_canal_vendas == filterValue);
      let propostasInconsistenciasFiltrados = this.propostasInconsistencias.filter(valorContratos => valorContratos.codigo_canal_vendas == filterValue);
      this.canalVendas = canalVendasFiltrados;
      this.propostasInconsistencias = propostasInconsistenciasFiltrados;
      this.habilitaFiltrosSecundarios(this.canalVendas);
    }
  }

  habilitaFiltrosSecundarios(agrupamento) {
    let canalVendasFiltrados = [];
    let regionaisFiltrados = [];
    let comerciaisFiltrados = [];
    let lojasMatrizFiltrados = [];
    let lojasFiltrados = [];
    let funcionariosFiltrados = [];
    let instituicaoFiltrados = [];
    if (agrupamento[0].filtro_avancado.lenght != 0) {
      if (agrupamento[0].filtro_avancado.canal_vendas.lenght != 0) {
        for (var _i = 0; _i < agrupamento[0].filtro_avancado.canal_vendas.length; _i++) {
          var num = agrupamento[0].filtro_avancado.canal_vendas[_i];
          if (num.codigo != null) {
            let valor = this.canalVendas.filter(valorCanalVendas => valorCanalVendas.codigo_canal_vendas == num.codigo)
            if (valor.length != 0) {
              canalVendasFiltrados.push(valor[0]);
            }
          }
        }
        this.canalVendas = [];
        this.canalVendas = canalVendasFiltrados;
      }

      if (agrupamento[0].filtro_avancado.comercial.lenght != 0) {
        for (var _i = 0; _i < agrupamento[0].filtro_avancado.comercial.length; _i++) {
          var num = agrupamento[0].filtro_avancado.comercial[_i];
          if (num.codigo != null) {
            let valor = this.comercial.filter(valorComercial => valorComercial.codigo_comercial == num.codigo)
            if (valor.length != 0) {
              comerciaisFiltrados.push(valor[0]);
            }
          }
        }
        this.comercial = [];
        this.comercial = comerciaisFiltrados;
      }

      if (agrupamento[0].filtro_avancado.instituicao.lenght != 0) {
        for (var _i = 0; _i < agrupamento[0].filtro_avancado.instituicao.length; _i++) {
          var num = agrupamento[0].filtro_avancado.instituicao[_i];
          if (num.codigo != null) {
            let valor = this.instituicao.filter(valorInstituicao => valorInstituicao.codigo_instituicao == num.codigo)
            if (valor.length != 0) {
              instituicaoFiltrados.push(valor[0]);
            }
          }
        }
        this.instituicao = [];
        this.instituicao = instituicaoFiltrados;
      }

      if (agrupamento[0].filtro_avancado.regional.lenght != 0) {
        for (var _i = 0; _i < agrupamento[0].filtro_avancado.regional.length; _i++) {
          var num = agrupamento[0].filtro_avancado.regional[_i];
          if (num.codigo != null) {
            let valor = this.regional.filter(valorRegional => valorRegional.codigo_regional == num.codigo);
            if (valor.length != 0) {
              regionaisFiltrados.push(valor[0]);
            }
          }
        }
        this.regional = [];
        this.regional = regionaisFiltrados;
      }

      if (agrupamento[0].filtro_avancado.loja.lenght != 0) {
        for (var _i = 0; _i < agrupamento[0].filtro_avancado.loja.length; _i++) {
          var num = agrupamento[0].filtro_avancado.loja[_i];
          if (num.codigo != null) {
            let valor = this.loja.filter(valorLoja => valorLoja.codigo_loja == num.codigo);
            if (valor.length != 0) {
              lojasFiltrados.push(valor[0]);
            }
          }
        }
        this.loja = [];
        this.loja = lojasFiltrados;
      }

      if (agrupamento[0].filtro_avancado.loja_matriz.lenght != 0) {
        for (var _i = 0; _i < agrupamento[0].filtro_avancado.loja_matriz.length; _i++) {
          var num = agrupamento[0].filtro_avancado.loja_matriz[_i];
          if (num.codigo != null) {
            let valor = this.matriz.filter(valorLojaMatriz => valorLojaMatriz.codigo_loja_matriz == num.codigo);
            if (valor.length != 0) {
              lojasMatrizFiltrados.push(valor[0]);
            }
          }
        }
        this.matriz = [];
        this.matriz = lojasMatrizFiltrados;
      }

      if (agrupamento[0].filtro_avancado.funcionario.lenght != 0) {
        for (var _i = 0; _i < agrupamento[0].filtro_avancado.funcionario.length; _i++) {
          var num = agrupamento[0].filtro_avancado.funcionario[_i];
          if (num.codigo != null) {
            let valor = this.funcionario.filter(valorFuncionario => valorFuncionario.codigo_funcionario == num.codigo);
            if (valor.length != 0) {
              funcionariosFiltrados.push(valor[0]);
            }
          }
        }
        this.funcionario = [];
        this.funcionario = funcionariosFiltrados;
      }
    }
  }


  ngOnInit() {
    registerLocaleData(pt);
  }

  ngOnDestroy() {
    this.subscriptionEsteira.unsubscribe();
  }
}
