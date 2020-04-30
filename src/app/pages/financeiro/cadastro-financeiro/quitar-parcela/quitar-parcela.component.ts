import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { CadastroFinanceiroComponent } from '../cadastro-financeiro.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FinanceiroApiService } from '../../../../api/financeiro';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'quitar-parcela',
  templateUrl: './quitar-parcela.component.html',
  styleUrls: ['./quitar-parcela.component.scss']
})
export class QuitarParcelaComponent implements OnInit {

  formulario: FormGroup;
  erro: boolean = false;
  mensagem_erro: string = '';
  dadosEditado: any;

  total = 0;
  data_pagamento_recebimento: any;
  plano_de_conta = '';
  codigo_plano_de_conta = 0;
  multa_perc = Number((0).toFixed(2));;
  juros_perc = Number((0).toFixed(2));;
  descontos_perc = Number((0).toFixed(2));;
  multa = Number((0).toFixed(2));;
  juros = Number((0).toFixed(2));;
  descontos = Number((0).toFixed(2));;
  valor_evento = Number((0).toFixed(2));;

  modalConfirmacao: NgbModalRef;

  // Conta Caixa (Plano de contas)
  filteredDadosContaCaixa$: Observable<string[]>;
  dadosContaCaixa: any[];
  pk_filteredDadosContaCaixa = [];
  nomesContaCaixa: any[];
  ContaCaixa_codigo: number;
  @ViewChild('autoInputContaCaixa', { static: false }) inputContaCaixa;
  @ViewChild('inputDataQuitacao') inputDataQuitacaoRef: ElementRef;
  @ViewChild('salvarId') salvarIdRef: ElementRef;
  

  constructor(protected options: CadastroFinanceiroComponent,
    private formBuilder: FormBuilder,
    private modal: NgbModal,
    private FinanceiroApiService: FinanceiroApiService,
    private renderer: Renderer2) {

    this.dadosEditado = [];


    if (this.options.parcelaUnica !== undefined) {
      this.dadosEditado = Object(this.options.parcelaUnica);

      if (this.dadosEditado.valor !== null) {
        if (this.dadosEditado.valor_restante !== 0 && this.dadosEditado.valor_restante !== null) {
          this.valor_evento = Number(this.dadosEditado.valor_restante.toFixed(2));
          this.total = Number(this.dadosEditado.valor_restante.toFixed(2));
          this.data_pagamento_recebimento = Date.now();
        }
        else {
          this.valor_evento = Number(this.dadosEditado.valor.toFixed(2));
          this.total = Number(this.dadosEditado.valor.toFixed(2));
          this.data_pagamento_recebimento = Date.now();
        }
      } else {
        this.valor_evento = Number((0).toFixed(2));
        this.total = Number((0).toFixed(2));
        this.data_pagamento_recebimento = Date.now();
      }
    }

    this.formulario = this.formBuilder.group({
      codigo_plano_conta: [this.codigo_plano_de_conta],
      plano_de_conta: [this.plano_de_conta],
      valor_evento: [this.valor_evento.toFixed(2)],
      financeiro_parcela_pk: [this.dadosEditado.pk],
      multa_mora: [this.multa.toFixed(2)],
      multa_mora_perc: [this.multa_perc.toFixed(2)],
      juros: [this.juros.toFixed(2)],
      juros_perc: [this.juros_perc.toFixed(2)],
      descontos: [this.descontos.toFixed(2)],
      descontos_perc: [this.descontos_perc.toFixed(2)],
      data_pagamento_recebimento: [this.data_pagamento_recebimento],
      valor_total: [this.total.toFixed(2)],
    });

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.renderer.selectRootElement(this.inputDataQuitacaoRef.nativeElement).focus();
 }

  salvarQuitacao() {
    if (this.formulario.value.valor_evento === null || String(this.formulario.value.valor_evento).trim() === '') {
      this.erro = true;
      this.mensagem_erro = 'Sem dados para a inserção';
    } else {
      if (this.options.formulario.value.pk !== null || String(this.options.formulario.value.pk).trim() !== '') {
        this.erro = false;
        this.mensagem_erro = '';
        this.options.SalvarQuitarParcela(this.formulario.value);
      }
    }
  }

  calculaJurosPerc() {
    var juros_perc = Number(this.formulario.value.valor_evento * (this.formulario.value.juros_perc / 100));
    this.formulario.controls['juros'].setValue((juros_perc).toFixed(2));
    this.calculaValorTotal();
  }
  calculaMultaPerc() {
    var multa_perc = Number(this.formulario.value.valor_evento * (this.formulario.value.multa_mora_perc / 100));
    this.formulario.controls['multa_mora'].setValue((multa_perc).toFixed(2));
    this.calculaValorTotal();
  }
  calculaDescontoPerc() {
    var descontos_perc = Number(this.formulario.value.valor_evento * (this.formulario.value.descontos_perc / 100));
    this.formulario.controls['descontos'].setValue((descontos_perc).toFixed(2));
    this.calculaValorTotal();
  }

  calculaJuros() {
    var juros = Number((this.formulario.value.juros * 100) / this.formulario.value.valor_evento);
    this.formulario.controls['juros_perc'].setValue((juros).toFixed(2));
    this.calculaValorTotal();
  }
  calculaMulta() {
    var multa = Number((this.formulario.value.multa_mora * 100) / this.formulario.value.valor_evento);
    this.formulario.controls['multa_mora_perc'].setValue((multa).toFixed(2));
    this.calculaValorTotal();
  }
  calculaDesconto() {
    var descontos = Number((this.formulario.value.descontos * 100) / this.formulario.value.valor_evento);
    this.formulario.controls['descontos_perc'].setValue((descontos).toFixed(2));
    this.calculaValorTotal();

  }

  calculaValorTotal() {
    var valorTotal = (Number(this.formulario.value.valor_evento) + Number(this.formulario.value.multa_mora) + Number(this.formulario.value.juros)) - Number(this.formulario.value.descontos);
    this.formulario.controls['valor_total'].setValue((valorTotal).toFixed(2));
  }

  onChangeContaCaixa() {
    this.FinanceiroApiService.getTipoContaCorrenteBuscaAutomatica(
      {
        'pesquisa': this.inputContaCaixa.nativeElement.value,
      },
    )
      .then((s) => {
        var nomes = [];
        this.dadosContaCaixa = s;
        for (let i of s) {
          nomes.push(String(i.nome));
        }
        this.nomesContaCaixa = nomes;
        this.filteredDadosContaCaixa$ = of(nomes); // this.getFilteredOptionsPN(this.inputPN.nativeElement.value);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onSelectionChangeContaCaixa($event) {
    this.filteredDadosContaCaixa$ = this.getFilteredOptionsContaCaixa($event);
    if (this.dadosContaCaixa !== undefined) {
      if (this.dadosContaCaixa.length !== 0) {
        this.pk_filteredDadosContaCaixa = this.dadosContaCaixa.filter((item) => {
          return item.nome === $event;
        });
        this.ContaCaixa_codigo = Number(this.pk_filteredDadosContaCaixa[0].pk);
        this.formulario.controls['codigo_plano_conta'].setValue(this.ContaCaixa_codigo);
        console.log(this.formulario.value);
      }
    }
  }

  getFilteredOptionsContaCaixa(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filterContaCaixa(filterString)),
    );
  }

  private filterContaCaixa(value: string): string[] {
    const filterValue = value.toLowerCase();
    if (this.nomesContaCaixa !== undefined) {
      return this.nomesContaCaixa.filter(optionValue => value.toLowerCase().includes(filterValue));
    }
  }

}
