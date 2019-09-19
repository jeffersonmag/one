import { Component, OnInit } from '@angular/core';
import { NbThemeService, NbSortDirection, NbTreeGridDataSource, NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService, } from '@nebular/theme';
import _ from 'lodash';
import { takeWhile } from 'rxjs/operators';
import { PendenciaFisicoApiService } from '../../api/pendencia-fisico';
import { FormGroup, FormBuilder } from '@angular/forms';


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

  codigo_status_time_line: number;
  codigoAba: number;

  linearMode = false;
  primeiroPasso: FormGroup;
  segundoPasso: FormGroup;
  terceiroPasso: FormGroup;

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
  index = 1;
  destroyByClick = true;
  duration = 5000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = true;
  status: NbComponentStatus = 'success';
  titulo: string = 'Sucesso';
  mensagem: string = 'Ação realizada com sucesso!';

  currentPage = 1;
  itemsPerPage = 20;
  pageSize: number;
  valorAtual: any;

  customColumn = 'name';
  defaultColumns = ['size', 'kind', 'items'];
  allColumns = [this.customColumn, ...this.defaultColumns];

  dataSource: NbTreeGridDataSource<any>;

  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  pendencia = [];
  pendenciaSintetico = [];
  pendenciaSinteticoTemp = [];
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

  activeTab: boolean;

  dadosPendenciasLoad = true;
  dadosPendencias = [];

  constructor(
    private themeService: NbThemeService,
    private pendenciaFisicoApiService: PendenciaFisicoApiService,
    private fb: FormBuilder,
    private toastrService: NbToastrService
  ) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });
    this.findPendenciaSintetico();
    //this.findPendencia(this.codigo_status_time_line);
  }

  findPendenciaSintetico() {
    this.pendenciaSintetico = [];
    this.pendenciaFisicoApiService.pendenciasSintetico({
      "data_de": "",
      "data_ate": "",
      "criterio_de_data": "",
      "codigo_matriz": "",
      "codigo_comercial": "",
      "codigo_regional": "",
      "codigo_loja": "",
      "codigo_funcionario": ""
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
    let codigo_status_time_line = _.find(this.pendenciaSintetico, (o: any) => {
      if (String(o.status_time_line) === String(event.tabTitle)) {
        return String(o.codigo_status_time_line)
      }
    })
    this.valorAtual = event;
    this.pendenciaFisicoApiService.pendencias({
      "data_de": "",
      "data_ate": "",
      "criterio_de_data": "",
      "codigo_matriz": "",
      "codigo_comercial": "",
      "codigo_regional": "",
      "codigo_loja": "",
      "codigo_funcionario": "",
      "status_time_line": codigo_status_time_line.codigo_status_time_line
    })
      .then((s) => {
        //this.comercial = s.agrupado_comercial;
        //this.regional = s.agrupado_regional;
        //this.funcionario = s.agrupado_funcionario;
        //this.loja = s.agrupado_loja;
        //this.matriz = s.agrupado_loja_matriz;
        this.pendencia = s.dados;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findPendenciaInicial(codigo_status_time_line) {
    this.limparFiltros = false;
    this.pendencia = [];
    //let codigo_status_time_line = _.find(this.pendenciaSintetico, (o: any) => {
    //  if (String(o.status_time_line) === String(event.tabTitle)) {
    //    return String(o.codigo_status_time_line)
    //  }
    //})
    this.pendenciaFisicoApiService.pendencias({
      "data_de": "",
      "data_ate": "",
      "criterio_de_data": "",
      "codigo_matriz": "",
      "codigo_comercial": "",
      "codigo_regional": "",
      "codigo_loja": "",
      "codigo_funcionario": "",
      "status_time_line": codigo_status_time_line
    })
      .then((s) => {
        //this.comercial = s.agrupado_comercial;
        //this.regional = s.agrupado_regional;
        //this.funcionario = s.agrupado_funcionario;
        //this.loja = s.agrupado_loja;
        //this.matriz = s.agrupado_loja_matriz;
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
      "codigo_regional": "",
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
      "codigo_comercial": "",
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

  limparFiltro() {
    this.pendencia = [];
    this.limparFiltros = true;
    this.regional[0];
    this.comercial[0];
    this.matriz[0];
    this.loja[0];
    this.funcionario[0];
  }

  enviarPreBordero(pk_contrato) {
    this.pendenciaFisicoApiService.enviarPreBordero({
      "pk_contrato": pk_contrato
    })
      .then((s) => {
        this.makeToast('success', 'Sucesso', 'Proposta inserida no Pré Borderô');
        this.findPendenciaInicial(0);
      })
      .catch((e) => {
        let erro = e.error.message;
        this.makeToast('danger', 'Erro', erro);
        this.findPendenciaInicial(0);
      });
  }

  retirarPreBordero(pk_contrato) {
    this.pendenciaFisicoApiService.retirarPreBordero({
      "pk_contrato": pk_contrato
    })
      .then((s) => {
        this.makeToast('success', 'Sucesso', 'Proposta removida do Pré Borderô');
        this.findPendencia(this.valorAtual);
      })
      .catch((e) => {
        let erro = e.error.message;
        this.makeToast('danger', 'Erro', erro);
        this.findPendencia(this.valorAtual);
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


  ngOnInit() {
    /*this.primeiroPasso = this.fb.group({
      firstCtrl: ['', Validators.required],
    });
    this.segundoPasso = this.fb.group({
      firstCtrl: ['', Validators.required],
    });
    this.terceiroPasso = this.fb.group({
      firstCtrl: ['', Validators.required],
    });*/
  }

}
