import { Component, Input, Injector } from '@angular/core';
import { EsteiraProducaoApiService } from '../../../api/esteira-producao';
import { CustomModalOptions, EsteiraProducaoComponent } from '../esteira-producao.component'
import _ from 'lodash';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';

@Component({
  selector: 'base-historica',
  templateUrl: './base-historica.component.html',
  styleUrls: ['./base-historica.component.scss']
})
export class BaseHistoricaComponent {

  cpf_c: number;
  nome_c: string;
  drillDown = [];


  constructor(private EsteiraProducaoApiService: EsteiraProducaoApiService,
    private options: EsteiraProducaoComponent) {
    registerLocaleData(es);
    this.findDrillDown();
  }


  findDrillDown() {
    this.drillDown = [];
    this.cpf_c = this.options.cpf_cliente;
    this.nome_c = this.options.nome_cliente;
    this.EsteiraProducaoApiService.drillDown(
      {
        "cpf_cliente": this.cpf_c
      }
    ).then((s) => {
      this.drillDown = s;
    })
      .catch((e) => {
        console.log(e)
      });
  }
}
