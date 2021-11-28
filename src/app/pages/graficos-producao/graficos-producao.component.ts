import { formatNumber } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../api/api.service';
declare var google: any;

@Component({
  selector: 'ngx-graficos-producao',
  templateUrl: './graficos-producao.component.html',
  styleUrls: ['./graficos-producao.component.scss']
})
export class GraficosProducaoComponent {
  mesAno;
  constructor() { }

}
