import { Component, Input, AfterViewInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { ComissoesPagasApiService } from '../../../../../src/app/api/comissoes-pagas';
import { ComissoesPagasComponent } from '../comissoes-pagas.component';

@Component({
  selector: 'detail-grid',
  templateUrl: './comissoes-pagas-detalhes.component.html',
  styleUrls: ['./comissoes-pagas-detalhes.component.scss']
})
export class ComissoesPagasDetalhesComponent implements AfterViewInit {

  @Input() key: number;
  comissoesPagasAnalitico: any;
  comissoesPagasDetalhe: DataSource;
  buscandoDados: boolean = true;

  constructor(
    private ComissoesApiService: ComissoesPagasApiService,
    private options: ComissoesPagasComponent
    ) {
    this.buscarDetalhamentoComissoesPagas();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.comissoesPagasDetalhe = new DataSource({
      store: new ArrayStore({
        data: this.comissoesPagasAnalitico,
        key: "codigo"
      }),
      filter: ["conta_pagar", "=", this.key]
    })
  }

  buscarDetalhamentoComissoesPagas() {
    this.ComissoesApiService.ComissoesPagasAnalitico(
      {
        "codigo_pagar": this.options.comissoesPagas[0].codigo,
      }
    )
      .then((s) => {
        this.comissoesPagasAnalitico = s;
        this.buscandoDados = false;
      })
      .catch((e) => {
        console.log(e);
        this.buscandoDados = false;
      });
  }

}
