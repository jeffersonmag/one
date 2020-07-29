import { Component, OnInit, ViewChild } from '@angular/core';
import { TabelaComissaoApiService } from '../../api/tabela-comissao';
import { NbGlobalPhysicalPosition, NbComponentStatus, NbToastrService } from '@nebular/theme';
import DataSource from 'devextreme/data/data_source';
import { DxPivotGridComponent } from 'devextreme-angular';

interface TabelaComissao {
  codigo_parceria: number;
  convenio: string;
  id: number;
  instituicao: string;
  parceria: string;
  vigencia_final_parceria: any;
  vigencia_inicial_parceria: any;
}

@Component({
  selector: 'ngx-tabela-comissao',
  templateUrl: './tabela-comissao.component.html',
  styleUrls: ['./tabela-comissao.component.scss']
})

export class TabelaComissaoComponent implements OnInit {
  @ViewChild(DxPivotGridComponent, { static: false }) pivotGrid: DxPivotGridComponent;

  dadosTabelaComissao: DataSource;
  currentDadosTabelaComissaoRepasse: TabelaComissao;
  dataGridTabelaComissaoRepasse: any;
  carregando: boolean;

  listSelectionChanged = (e) => {
    this.carregando = true;
    this.dataGridTabelaComissaoRepasse = [];
    this.currentDadosTabelaComissaoRepasse = e.addedItems[0];
    this.detalharTabelaComissao(this.currentDadosTabelaComissaoRepasse);
  };

  constructor(
    private TabelaComissaoApiService: TabelaComissaoApiService,
    private toastrService: NbToastrService,
  ) {
    this.listarDadosdaTabelaComissaoRepasse();
  }

  ngOnInit(): void {
  }

  listarDadosdaTabelaComissaoRepasse() {
    this.dataGridTabelaComissaoRepasse = [];
    this.TabelaComissaoApiService.listarTabela(
      {},
    )
      .then((s) => {
        this.dadosTabelaComissao = s;
        this.currentDadosTabelaComissaoRepasse = this.getFirstTabela();
        this.detalharTabelaComissao(this.currentDadosTabelaComissaoRepasse);
      })
      .catch((e) => {
        console.log(e);
        this.makeToast('danger', 'Ocorreu um erro!', e.error.message);
      });
  }

  getFirstTabela() {
    return this.dadosTabelaComissao[0];
  }

  detalharTabelaComissao(dados) {
    this.TabelaComissaoApiService.detalharTabela(
      {
        'codigo_tabela': dados.id,
        'codigo_parceria': dados.codigo_parceria,
      },
    )
      .then((s) => {
        this.carregando = false;
        this.dataGridTabelaComissaoRepasse = s[0];
      })
      .catch((e) => {
        this.carregando = false;
        console.log(e);
        this.makeToast('danger', 'Ocorreu um erro!', e.error.message);
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

}
