import { Component, OnInit } from '@angular/core';
import { NbTooltipModule, NbTooltipComponent, NbTooltipDirective } from '@nebular/theme';
import { PendenciaFisicoApiService } from '../../../api/pendencia-fisico';

@Component({
  selector: 'listagem-bordero',
  templateUrl: './listagem-bordero.component.html',
  styleUrls: ['./listagem-bordero.component.scss']
})
export class ListagemBorderoComponent implements OnInit {

  listaBordero = [];

  constructor(private pendenciaApiService: PendenciaFisicoApiService) {
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


  ngOnInit() {
  }

}
