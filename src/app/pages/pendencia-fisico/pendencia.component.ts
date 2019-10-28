import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NbThemeService, NbSortDirection, NbTreeGridDataSource, NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService, NbSearchService, } from '@nebular/theme';
import _ from 'lodash';
import { takeWhile } from 'rxjs/operators';
import { PendenciaFisicoApiService } from '../../api/pendencia-fisico';
import { FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

//export interface Fruit {
//  name: string;
//}

@Component({
  selector: 'ngx-pendencia',
  styleUrls: ['./pendencia.component.scss'],
  templateUrl: './pendencia.component.html',
  preserveWhitespaces: true,
})
export class PendenciaComponent implements OnInit, OnDestroy {

  private alive = true;
  flipped: boolean = false;
  codigo_status_time_line: number;
  codigoAba: number;
  modalReference: NgbModalRef;
  linearMode = false;
  primeiroPasso: FormGroup;
  segundoPasso: FormGroup;
  terceiroPasso: FormGroup;
  solarValue: number;
  statusCards: string;
  commonStatusCardsSet: CardSettings[] = [];
  status_time_line: number;

  revealed = {
    regional: false,
    comercial: false,
    funcionario: false,
    loja: false,
    lojaMatriz: false,
    canalVendas: false,
    tipoPendencia: false,
    pendencias: true,
    pendenciaFisico: true
  }

  statusCardsByThemes: {
    default: CardSettings[];
    dark: CardSettings[];
  } = {
      default: this.commonStatusCardsSet,
      dark: this.commonStatusCardsSet,
    };

  ativaBotaoComercial = false;
  ativaBotaoRegional = false;
  ativaBotaoLoja = false;
  ativaBotaoLojaMatriz = false;
  ativaBotaoFuncionario = false;
  ativaBotaocanalVendas = false;
  ativaBotaoTipoPendencia = false;
  ativaBotaoBordero = false;
  habilitaLimparFiltro = false;

  codigoComercial = '';
  codigoRegional = '';
  codigoLoja = '';
  codigoLojaMatriz = '';
  codigoFuncionario = '';
  codigoCanalVendas = '';
  codigoTipoPendencia = '';
  codigoBordero = '';
  digitoBordero = '';
  nomeComercial = '';
  nomeRegional = '';
  nomeLoja = '';
  nomeFuncionario = '';
  nomeLojaMatriz = '';
  nomeCanalVendas = '';
  nomeTipoPendencia = '';

  currentPage = 1;
  itemsPerPage = 20;
  pageSize: number;
  valorAtual: any;
  numero_contratos: number = 0;
  customColumn = 'name';
  defaultColumns = ['size', 'kind', 'items'];
  allColumns = [this.customColumn, ...this.defaultColumns];
  dataSource: NbTreeGridDataSource<any>;
  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  pendencia = [];
  pendenciaSintetico = [];
  pendenciaSinteticoTemp = [];

  funcionario = [];
  loja = [];
  matriz = [];
  comercial = [];
  regional = [];
  canalVendas = [];
  tipoPendencia = [];
  bordero = [];
  lista_tipo_bordero = [];

  limparFiltros: boolean = false;
  pararSpinner: boolean = true;
  activeTab: boolean;
  dadosPendenciasLoad = true;
  dadosPendencias = [];
  value = '';
  subscription: Subscription;

  constructor(
    private themeService: NbThemeService,
    private pendenciaFisicoApiService: PendenciaFisicoApiService,
    private modalService: NgbModal,
    private searchServicePendencia: NbSearchService,
    private toastrService: NbToastrService
  ) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });

    this.subscription = this.searchServicePendencia.onSearchSubmit()
      .subscribe((data: any) => {
        this.value = data.term;
        this.filtroFindContratosSearch(this.value);
      });

    this.findPendenciaSintetico();
  }

  filtroFindContratosSearch(proposta) {
    if (proposta != 0) {
      let pendenciaFiltrados = this.pendencia.filter(valorContratos => valorContratos.proposta == proposta);
      if (pendenciaFiltrados.length == 0) {
        this.makeToast('warning', 'Filtro Vazio', 'Sem propostas para serem exibidas');
        this.habilitaLimparFiltro = false;
        this.findPendenciaSintetico();
      } else {
        this.pendencia = pendenciaFiltrados;
        this.habilitaLimparFiltro = true;
      }
    }
  }

  atualizaContador(vazio: boolean) {
    this.pendenciaSintetico = [];
    this.pendenciaSinteticoTemp = [];
    this.pendenciaFisicoApiService.pendenciasSintetico(
      {
        "data_de": "",
        "data_ate": "",
        "criterio_de_data": "",
        "codigo_matriz": Number(this.codigoLojaMatriz),
        "codigo_comercial": Number(this.codigoComercial),
        "codigo_regional": Number(this.codigoRegional),
        "codigo_loja": Number(this.codigoLoja),
        "codigo_funcionario": Number(this.codigoFuncionario),
        "status_farol": this.codigoTipoPendencia,
        "codigo_canal_vendas": Number(this.codigoCanalVendas),
        "numero_bordero": Number(this.codigoBordero),
      }
    ).then((s) => {
      this.pendenciaSintetico = s.status_time_line;
      for (let i of this.pendenciaSintetico) {
        if (i.codigo_status_time_line == this.codigo_status_time_line) {
          this.pendenciaSinteticoTemp.push(i = {
            ...i,
            "ativo": true
          })
        } else {
          this.pendenciaSinteticoTemp.push(i = {
            ...i,
            "ativo": false
          })
        }
      }
      this.pendenciaSintetico = this.pendenciaSinteticoTemp;
      if (this.pendenciaSintetico.length == 0) {
        this.makeToast('warning', 'Filtro Vazio', 'Sem propostas para serem exibidas');
      }
      if (!vazio) {
        this.findPendenciaInicial(this.codigo_status_time_line);
      }
    })
      .catch((e) => {
        console.log(e);
      });
  }

  findPendenciaSintetico() {
    this.habilitaLimparFiltro = false;
    this.pendenciaSintetico = [];
    this.pendenciaSinteticoTemp = [];
    this.pendenciaFisicoApiService.pendenciasSintetico({
      "data_de": "",
      "data_ate": "",
      "criterio_de_data": "",
      "codigo_matriz": Number(this.codigoLojaMatriz),
      "codigo_comercial": Number(this.codigoComercial),
      "codigo_regional": Number(this.codigoRegional),
      "codigo_loja": Number(this.codigoLoja),
      "codigo_funcionario": Number(this.codigoFuncionario),
      "status_farol": this.codigoTipoPendencia,
      "codigo_canal_vendas": Number(this.codigoCanalVendas),
      "numero_bordero": Number(this.codigoBordero),
    }
    ).then((s) => {
      this.pendenciaSintetico = s.status_time_line;
      for (let i of this.pendenciaSintetico) {
        if (i.codigo_status_time_line == 0) {
          this.pendenciaSinteticoTemp.push(i = {
            ...i,
            "ativo": true
          })
        } else {
          this.pendenciaSinteticoTemp.push(i = {
            ...i,
            "ativo": false
          })
        }
      }
      this.pendenciaSintetico = this.pendenciaSinteticoTemp;
      this.findPendenciaInicial(0);
    })
      .catch((e) => {
        console.log(e);
      });
  }

  findPendencia(event) {
    this.limparFiltros = false;
    this.pendencia = [];
    this.comercial = [];
    this.regional = [];
    this.funcionario = [];
    this.canalVendas = [];
    this.tipoPendencia = [];
    this.loja = [];
    this.matriz = [];
    this.pararSpinner = true;
    let codigo_status_time_line = _.find(this.pendenciaSintetico, (o: any) => {
      if (String(o.status_time_line) === String(event.tabTitle)) {
        return String(o.codigo_status_time_line)
      }
    })
    this.codigo_status_time_line = codigo_status_time_line.codigo_status_time_line
    this.valorAtual = event;
    this.pendenciaFisicoApiService.pendencias({
      "data_de": "",
      "data_ate": "",
      "criterio_de_data": "",
      "codigo_matriz": Number(this.codigoLojaMatriz),
      "codigo_comercial": Number(this.codigoComercial),
      "codigo_regional": Number(this.codigoRegional),
      "codigo_loja": Number(this.codigoLoja),
      "codigo_funcionario": Number(this.codigoFuncionario),
      "status_farol": this.codigoTipoPendencia,
      "codigo_canal_vendas": Number(this.codigoCanalVendas),
      "numero_bordero": Number(this.codigoBordero),
      "status_time_line": codigo_status_time_line.codigo_status_time_line,
    })
      .then((s) => {
        this.pendencia = s.dados;
        this.comercial = s.agrupado_comercial;
        this.regional = s.agrupado_regional;
        this.funcionario = s.agrupado_funcionario;
        this.loja = s.agrupado_loja;
        this.matriz = s.agrupado_loja_matriz;
        this.canalVendas = s.agrupado_canal_vendas;
        this.tipoPendencia = s.agrupado_status_farol;
        if (this.pendencia.length == 0) {
          this.pararSpinner = false;
          this.makeToast('warning', 'Filtro Vazio', 'Sem propostas para serem exibidas');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findPendenciaInicial(codigo_status_time_line) {
    this.limparFiltros = false;
    this.pendencia = [];
    this.comercial = [];
    this.regional = [];
    this.funcionario = [];
    this.canalVendas = [];
    this.tipoPendencia = [];
    this.loja = [];
    this.matriz = [];
    this.pararSpinner = true;
    this.codigo_status_time_line = codigo_status_time_line;
    this.pendenciaFisicoApiService.pendencias({
      "data_de": "",
      "data_ate": "",
      "criterio_de_data": "",
      "codigo_matriz": Number(this.codigoLojaMatriz),
      "codigo_comercial": Number(this.codigoComercial),
      "codigo_regional": Number(this.codigoRegional),
      "codigo_loja": Number(this.codigoLoja),
      "codigo_funcionario": Number(this.codigoFuncionario),
      "status_farol": this.codigoTipoPendencia,
      "codigo_canal_vendas": Number(this.codigoCanalVendas),
      "numero_bordero": Number(this.codigoBordero),
      "status_time_line": Number(this.codigo_status_time_line),
    })
      .then((s) => {
        this.pendencia = s.dados;
        this.comercial = s.agrupado_comercial;
        this.regional = s.agrupado_regional;
        this.funcionario = s.agrupado_funcionario;
        this.loja = s.agrupado_loja;
        this.matriz = s.agrupado_loja_matriz;
        this.canalVendas = s.agrupado_canal_vendas;
        this.tipoPendencia = s.agrupado_status_farol;
        if (this.pendencia.length == 0) {
          this.pararSpinner = false;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  toggleView(acao) {
    this.revealed[acao] = !this.revealed[acao];
  }

  revelar() {
    this.flipped = !this.flipped;
    if (!this.flipped &&
      (this.ativaBotaoFuncionario ||
        this.ativaBotaoComercial ||
        this.ativaBotaoRegional ||
        this.ativaBotaoTipoPendencia ||
        this.ativaBotaocanalVendas ||
        this.ativaBotaoLoja ||
        this.ativaBotaoLojaMatriz)) {
      this.atualizaContador(true);
    }
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  limparFiltro() {
    this.pendencia = [];
    this.limparFiltros = true;
    this.regional[0];
    this.comercial[0];
    this.matriz[0];
    this.loja[0];
    this.funcionario[0];
    this.canalVendas[0];
    this.tipoPendencia[0];
  }

  enviarPreBordero(pk_contrato) {
    this.pendenciaFisicoApiService.enviarPreBordero({
      "pk_contrato": pk_contrato,
      "id_tipo_bordero": this.codigo_status_time_line
    })
      .then((s) => {
        this.makeToast('success', 'Sucesso', 'Proposta inserida no Pré Borderô');
        this.findPendenciaSintetico();
        this.findPendenciaInicial(0);
      })
      .catch((e) => {
        let erro = e.error.message;
        this.makeToast('danger', 'Erro', erro);
        this.findPendenciaSintetico();
        this.findPendenciaInicial(0);
      });
  }

  retirarPreBordero(pk_contrato) {
    this.pendenciaFisicoApiService.retirarPreBordero({
      "pk_contrato": pk_contrato
    })
      .then((s) => {
        this.makeToast('success', 'Sucesso', 'Proposta removida do Pré Borderô');
        this.findPendenciaSintetico();
        this.findPendencia(this.valorAtual);
      })
      .catch((e) => {
        let erro = e.error.message;
        this.makeToast('danger', 'Erro', erro);
        this.findPendenciaSintetico();
        this.findPendencia(this.valorAtual);
      });
  }

  makeToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 10000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: true,
    };
    const titleContent = title ? `${title}` : '';

    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }

  confirmarBordero(modal) {
    this.modalReference = this.modalService.open(modal, { size: 'sm', backdrop: 'static' })
  }

  listarBordero(modal) {
    this.modalReference = this.modalService.open(modal, { size: 'lg', scrollable: false })
  }

  gerarEnvioBordero() {
    this.bordero = [];
    this.lista_tipo_bordero = [];
    if (this.numero_contratos == 0) {
      alert('Informe a quantidade de contratos para prosseguir!');
    } else {
      this.pendenciaFisicoApiService.gerarBordero({
        "qtd_contratos_conferencia": this.numero_contratos,
      })
        .then((s) => {
          this.bordero = s;
          this.lista_tipo_bordero = s.lista_tipo_bordero;
          if (this.lista_tipo_bordero[0].tipo == "REMESSA") {
            this.imprimirBorderoRemessa(s.codigo_bordero);
            //setTimeout(() => {
            if (this.lista_tipo_bordero[1].tipo == "REMESSA") {
              this.imprimirBorderoRemessa(s.codigo_bordero);
            };
            if (this.lista_tipo_bordero[1].tipo == "REGULARIZACAO") {
              this.imprimirBorderoRegularizacao(s.codigo_bordero);
            };
            //}, 2000);
          };
          if (this.lista_tipo_bordero[0].tipo == "REGULARIZACAO") {
            this.imprimirBorderoRegularizacao(s.codigo_bordero);
            //setTimeout(() => {
            if (this.lista_tipo_bordero[1].tipo == "REMESSA") {
              this.imprimirBorderoRemessa(s.codigo_bordero);
            };
            if (this.lista_tipo_bordero[1].tipo == "REGULARIZACAO") {
              this.imprimirBorderoRegularizacao(s.codigo_bordero);
            };
            //}, 5000);
          };
          this.close();
          this.findPendenciaSintetico();
        })
        .catch((e) => {
          this.close();
          this.numero_contratos = 0;
          let erro = e.error.message;
          this.makeToast('danger', 'Erro', erro);
        });
    }
  }

  imprimirBorderoRemessa(bordero) {
    this.pendenciaFisicoApiService.imprimirBorderoRemessa(null, bordero).then((s) => {
      //this.makeToast('success', 'Sucesso!', 'Borderô de Remessa gerado com sucesso!');
    })
      .catch((e) => {
        let erro = e.error.message;
        this.makeToast('danger', 'Erro', erro);
        console.log(e)
      });
  }

  imprimirBorderoRegularizacao(bordero) {
    this.pendenciaFisicoApiService.imprimirBorderoRegularizacao(null, bordero).then((s) => {
      //this.makeToast('success', 'Sucesso!', 'Borderô de Regularização gerado com sucesso!');
    })
      .catch((e) => {
        let erro = e.error.message;
        this.makeToast('danger', 'Erro', erro);
        console.log(e)
      });
  }


  private _filterRegional(value: number, nome?: string, limpar?: boolean): any {
    if (limpar && value == 0) {
      this.ativaBotaoRegional = false;
      this.codigoRegional = "";
      this.atualizaContador(this.ativaBotaoRegional)
    } else {
      this.ativaBotaoRegional = true;
      const filterValue = value;
      this.nomeRegional = nome;
      this.codigoRegional = String(filterValue);
      //this.atualizaContador(this.ativaBotaoRegional)
      let regionaisFiltrados = this.regional.filter(valorRegional => valorRegional.codigo_regional == filterValue);
      let pendenciaFiltrados = this.pendencia.filter(valorContratos => valorContratos.codigo_regional == filterValue);
      this.regional = regionaisFiltrados;
      this.pendencia = pendenciaFiltrados;
      this.habilitaFiltrosSecundarios(this.regional);
    }
  }

  private _filterComercial(value: number, nome?: string, limpar?: boolean): any {
    if (limpar && value == 0) {
      this.ativaBotaoComercial = false;
      this.codigoComercial = "";
      this.atualizaContador(this.ativaBotaoComercial)
    } else {
      const filterValue = value;
      this.ativaBotaoComercial = true;
      this.codigoComercial = String(filterValue);
      this.nomeComercial = nome;
      //this.atualizaContador(this.ativaBotaoComercial)
      let comerciaisFiltrados = this.comercial.filter(valorComercial => valorComercial.codigo_comercial == filterValue);
      let pendenciaFiltrados = this.pendencia.filter(valorContratos => valorContratos.codigo_comercial == filterValue);
      this.comercial = comerciaisFiltrados;
      this.pendencia = pendenciaFiltrados;
      this.habilitaFiltrosSecundarios(this.comercial);
    }
  }

  private _filterLoja(value: number, nome?: string, limpar?: boolean): any {
    if (limpar && value == 0) {
      this.ativaBotaoLoja = false;
      this.codigoLoja = "";
      this.atualizaContador(this.ativaBotaoLoja);
    } else {
      const filterValue = value;
      this.codigoLoja = String(filterValue);
      this.nomeLoja = nome;
      this.ativaBotaoLoja = true;
      //this.atualizaContador(this.ativaBotaoLoja);
      let lojasFiltrados = this.loja.filter(valorLoja => valorLoja.codigo_loja == filterValue);
      let pendenciaFiltrados = this.pendencia.filter(valorContratos => valorContratos.chave_loja == filterValue);
      this.loja = lojasFiltrados;
      this.pendencia = pendenciaFiltrados;
      this.habilitaFiltrosSecundarios(this.loja);
    }
  }

  private _filterLojaMatriz(value: number, nome?: string, limpar?: boolean): any {
    if (limpar && value == 0) {
      this.ativaBotaoLojaMatriz = false;
      this.codigoLojaMatriz = "";
      this.atualizaContador(this.ativaBotaoLoja);
    } else {
      const filterValue = value;
      this.codigoLojaMatriz = String(filterValue);
      this.nomeLojaMatriz = nome;
      this.ativaBotaoLojaMatriz = true;
      //this.atualizaContador(this.ativaBotaoLoja);
      let lojasMatrizFiltrados = this.matriz.filter(valorLojaMatriz => valorLojaMatriz.codigo_loja_matriz == filterValue);
      let pendenciaFiltrados = this.pendencia.filter(valorContratos => valorContratos.codigo_matriz == filterValue);
      this.matriz = lojasMatrizFiltrados;
      this.pendencia = pendenciaFiltrados;
      this.habilitaFiltrosSecundarios(this.matriz);
    }
  }

  private _filterFuncionario(value: number, nome?: string, limpar?: boolean): any {
    if (limpar && value == 0) {
      this.ativaBotaoFuncionario = false;
      this.codigoFuncionario = "";
      this.atualizaContador(this.ativaBotaoFuncionario);
    } else {
      const filterValue = value;
      this.ativaBotaoFuncionario = true;
      this.codigoFuncionario = String(filterValue);
      this.nomeFuncionario = nome;
      //this.atualizaContador(this.ativaBotaoFuncionario);
      let funcionariosFiltrados = this.funcionario.filter(valorFuncionario => valorFuncionario.codigo_funcionario == filterValue);
      let pendenciaFiltrados = this.pendencia.filter(valorContratos => valorContratos.codigo_funcionario == filterValue);
      this.funcionario = funcionariosFiltrados;
      this.pendencia = pendenciaFiltrados;
      this.habilitaFiltrosSecundarios(this.funcionario);
    }
  }

  private _filtercanalVendas(value: number, nome?: string, limpar?: boolean): any {
    if (limpar && value == 0) {
      this.ativaBotaocanalVendas = false;
      this.codigoCanalVendas = "";
      this.atualizaContador(this.ativaBotaocanalVendas);
    } else {
      const filterValue = value;
      this.ativaBotaocanalVendas = true;
      this.codigoCanalVendas = String(filterValue);
      this.nomeCanalVendas = nome;
      //this.atualizaContador(this.ativaBotaoFuncionario);
      let canalVendasFiltrados = this.canalVendas.filter(valorCanalVendas => valorCanalVendas.codigo_canal_vendas == filterValue);
      let pendenciaFiltrados = this.pendencia.filter(valorContratos => valorContratos.codigo_canal_vendas == filterValue);
      this.canalVendas = canalVendasFiltrados;
      this.pendencia = pendenciaFiltrados;
      this.habilitaFiltrosSecundarios(this.canalVendas);
    }
  }

  private _filterTipoPendencia(value: string, nome?: string, limpar?: boolean): any {
    if (limpar && value == "") {
      this.ativaBotaoTipoPendencia = false;
      this.codigoTipoPendencia = "";
      this.atualizaContador(this.ativaBotaoTipoPendencia);
    } else {
      let filterValuePen: string = value;
      this.ativaBotaoTipoPendencia = true;
      this.codigoTipoPendencia = filterValuePen;
      if (nome == 'E') {
        nome = 'PRIMEIRA ENTREGA';
      }
      if (nome == 'R') {
        nome = 'REABERTURA';
      }
      this.nomeTipoPendencia = nome;
      //this.atualizaContador(this.ativaBotaoFuncionario);
      let TipoPendenciaFiltrados = this.tipoPendencia.filter(valortipoPendencia => valortipoPendencia.codigo_status_farol == filterValuePen);
      let pendenciaFiltrados = this.pendencia.filter(valorContratos => valorContratos.status_farol == filterValuePen);
      this.tipoPendencia = TipoPendenciaFiltrados;
      this.pendencia = pendenciaFiltrados;
      this.habilitaFiltrosSecundarios(this.tipoPendencia);
    }
  }

  habilitaFiltrosSecundarios(agrupamento) {
    let canalVendasFiltrados = [];
    let pendenciaFiltrados = [];
    let regionaisFiltrados = [];
    let comerciaisFiltrados = [];
    let lojasMatrizFiltrados = [];
    let lojasFiltrados = [];
    let funcionariosFiltrados = [];
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

      if (agrupamento[0].filtro_avancado.status_farol.lenght != 0) {
        for (var _i = 0; _i < agrupamento[0].filtro_avancado.status_farol.length; _i++) {
          let codStatus = agrupamento[0].filtro_avancado.status_farol[_i];
          if (codStatus.nome != null) {
            let valor = this.tipoPendencia.filter(valortipoPendencia => valortipoPendencia.codigo_status_farol == codStatus.nome);
            if (valor.length != 0) {
              pendenciaFiltrados.push(valor[0]);
            }
          }
        }
        this.tipoPendencia = [];
        this.tipoPendencia = pendenciaFiltrados;
      }
    }
  }

  habilitaFiltrosBordero(bordero, digito_bordero) {
    this.pararSpinner = true;
    this.ativaBotaoBordero = true;
    this.codigoBordero = bordero;
    this.digitoBordero = digito_bordero;
    let pendenciaFiltrados = this.pendencia.filter(valorContratos => valorContratos.codigo_bordero == bordero);
    this.pendencia = pendenciaFiltrados;
    if (this.pendencia.length == 0) {
      this.pararSpinner = false;
    }
    this.atualizaContador(this.ativaBotaoBordero);
  }

  desabilitaFiltrosBordero() {
    this.ativaBotaoBordero = false;
    this.codigoBordero = '';
    this.atualizaContador(this.ativaBotaoBordero);
  }

  close() {
    this.modalReference.close();
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}