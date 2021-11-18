import { Component, OnInit } from '@angular/core';
import {
  NbThemeService, NbSortDirection, NbTreeGridDataSource, NbComponentStatus,
  NbGlobalPhysicalPosition, NbToastrService, NbSearchService
} from '@nebular/theme';
import { ComissoesApiService } from '../../api/comissoes';
import * as moment from 'moment';

@Component({
  selector: 'ngx-comissoes',
  templateUrl: './comissoes.component.html',
  styleUrls: ['./comissoes.component.scss']
})
export class ComissoesComponent implements OnInit {
  comissao;
  currentPage = 1;
  itemsPerPage = 20;
  pageSize: number;

  constructor(private themeService: NbThemeService,
    private comissoesApiService: ComissoesApiService) { }

  ngOnInit(): void {
    this.findComissoes();
  }

  findComissoes() {
    this.comissoesApiService.ExtratoPagamentoSintetico({}).
      then((res) => {
        console.log(res);
        this.comissao = res;
      })
  }

  downloadCSVAnalitico(codigo_pagar){
    //this.makeToast('info', 'Aguarde...', 'O Download está sendo feito');
    this.comissoesApiService.AnaliticoComissoesPagasCSV(codigo_pagar).then((s) => {
    })
      .catch((e) => {
        let erro = e.error.message;
        //this.makeToast('danger', 'Erro', erro);
        console.log(e)
      });
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

}
