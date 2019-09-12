import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NbSortDirection, NbTreeGridDataSource, NbDialogService, NbDialogRef } from '@nebular/theme';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { EsteiraProducaoApiService } from '../../api/esteira-producao';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

interface CardSettings {
  title: string;
  iconClass: string;
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

  private alive = true;
  flipped = false;
  solarValue: number;
  statusCards: string;
  commonStatusCardsSet: CardSettings[] = [];

  cpf_cliente: number;
  nome_cliente: string;
  proposta: number;
  codigo_status_agrupado_inconsistencia: number;


  currentPage = 1;
  itemsPerPage = 20;
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

  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  propostasInconsistencias = [];
  indicadores = [];
  drillDown = [];
  qtd_total_de_propostas_inconsistentes: number;


  constructor(
    private themeService: NbThemeService,
    private EsteiraProducaoApiService: EsteiraProducaoApiService,
    private modalService: NgbModal
  ) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });
    this.findIndicadores();
    this.findPropostasInconsistentes();
  }

  findIndicadores() {
    this.indicadores = [];
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
    })
      .catch((e) => {
        console.log(e)
      });
  }

  findPropostasInconsistentes() {
    this.propostasInconsistencias = [];
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
    })
      .catch((e) => {
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
      size: 'lg'
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

  findFiltroStatus(){
    console.log('passou');
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }
  ngOnInit() { }
}