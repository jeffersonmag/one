import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { NbSortDirection, NbTreeGridDataSource, NbGlobalPhysicalPosition, NbSearchService, NbToastrService, NbComponentStatus, NbGlobalPosition } from '@nebular/theme';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { EsteiraProducaoApiService } from '../../api/esteira-producao';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import _ from 'lodash';
import 'style-loader!angular2-toaster/toaster.css';

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

export class EsteiraProducaoComponent implements OnInit {

  @Output() childIsOpen = new EventEmitter<boolean>();
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
  filtropropostasInconsistencias: any;
  indicadores = [];
  indicadoresC = [];
  drillDown = [];
  qtd_total_de_propostas_inconsistentes: number;


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

    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.value = data.term;
        this.filtroFindPropostasInconsistentesSearch(this.value);
      })

    this.findIndicadores();
    this.findPropostasInconsistentes();
  }

  findIndicadores() {
    this.indicadores = [];
    this.indicadoresC = [];
    this.EsteiraProducaoApiService.indicadores(
      {
        "codigo_regional": "",
        "codigo_comercial": "",
        "codigo_loja": "",
        "codigo_matriz": "",
        "cpf_funcionario": "",
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
        "codigo_regional": "",
        "codigo_comercial": "",
        "codigo_loja": "",
        "codigo_matriz": "",
        "cpf_funcionario": "",
        "cpf_cliente": ""
      }
    ).then((s) => {
      this.propostasInconsistencias = s;
      if (this.propostasInconsistencias.length == 0) {
        this.pararSpinner = false;
      }
      this.setColors();
    })
      .catch((e) => {
        console.log(e)
      });
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
    } else {
      this.setColors();
    }
  }

  filtroFindPropostasInconsistentes(codigo_status_agrupado_inconsistencia) {
    this.propostasInconsistencias = [];
    this.on = !this.on
    if (this.on) {
      this.EsteiraProducaoApiService.propostasInconsistentes(
        {
          "codigo_regional": "",
          "codigo_comercial": "",
          "codigo_loja": "",
          "codigo_matriz": "",
          "cpf_funcionario": "",
          "cpf_cliente": "",
          "codigo_status_agrupado_inconsistencia": codigo_status_agrupado_inconsistencia
        }
      ).then((s) => {
        this.propostasInconsistencias = s;
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
    this.EsteiraProducaoApiService.propostasInconsistentes(
      {
        "codigo_regional": "",
        "codigo_comercial": "",
        "codigo_loja": "",
        "codigo_matriz": "",
        "cpf_funcionario": "",
        "cpf_cliente": "",
        "codigo_status_agrupado_inconsistencia": "",
        "proposta": proposta
      }
    ).then((s) => {
      if (s.length > 0) {
        this.propostasInconsistencias = [];
        this.propostasInconsistencias = s;
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
      });
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

  ngOnInit() {
    registerLocaleData(es);
  }
}
