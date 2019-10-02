import { Component, OnInit } from '@angular/core';
import { NbTooltipModule, NbTooltipComponent, NbTooltipDirective } from '@nebular/theme';
import { PendenciaFisicoApiService } from '../../../api/pendencia-fisico';
import { PendenciaComponent } from '../pendencia.component';

@Component({
  selector: 'listagem-bordero',
  templateUrl: './listagem-bordero.component.html',
  styleUrls: ['./listagem-bordero.component.scss']
})
export class ListagemBorderoComponent implements OnInit {

  listaBordero = [];

  constructor(private pendenciaApiService: PendenciaFisicoApiService,
    private options: PendenciaComponent) {
    this.carregarListaBordero();
  }

  carregarListaBordero() {
    this.listaBordero = [];
    this.pendenciaApiService.listarBordero(null).then((s) => {
      this.listaBordero = s;
    })
      .catch((e) => {
        console.log(e)
      });
  }

  imprimirBordero(bordero) {
    this.pendenciaApiService.imprimirBordero(null, bordero).then((s) => {
      this.options.close();
    })
      .catch((e) => {
        let erro = e.error.message;
        this.options.makeToast('danger', 'Erro', erro);
        console.log(e)
      });
  }

  filtrarBordero(bordero) {
    this.options.close();
    this.options.habilitaFiltrosBordero(bordero);
  }


  ngOnInit() {
  }

}
