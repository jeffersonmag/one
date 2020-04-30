import { Component, OnInit, ViewChild, Renderer2, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CadastrosApiService } from '../../../../api/cadastros';
import { FinanceiroApiService } from '../../../../api/financeiro';
import { FormGroup, FormBuilder } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ConfiguracoesComponent } from '../configuracoes.component';

@Component({
  selector: 'configuracoes-pagar',
  templateUrl: './configuracoes-pagar.component.html',
  styleUrls: ['./configuracoes-pagar.component.css']
})
export class ConfiguracoesPagarComponent implements OnInit, OnDestroy {

  // Conta Caixa (Plano de contas)
  filteredDadosContaCaixa$: Observable<string[]>;
  dadosContaCaixa: any[];
  pk_filteredDadosContaCaixa = [];
  nomesContaCaixa: any[];
  ContaCaixa_codigo: number;
  @ViewChild('autoInputContaCaixa', { static: false }) inputContaCaixa;
  @ViewChild('autoInputSinteticaFornecedores', { static: false }) inputSinteticaFornecedores;
  @ViewChild('autoInputRazaoMultas', { static: false }) InputRazaoMultas;
  @ViewChild('autoInputRazaoJuros', { static: false }) inputRazaoJuros;
  @ViewChild('autoinputRazaoDescontos', { static: false }) inputRazaoDescontos;
  formulario: FormGroup;

  dadosEditado: any;
  erro: boolean;
  mensagem_erro: string;

  constructor(private CadastrosApiService: CadastrosApiService,
    private FinanceiroApiService: FinanceiroApiService,
    private options: ConfiguracoesComponent,
    private formBuilder: FormBuilder,
    private renderer: Renderer2) {

    this.dadosEditado = [];
    if (this.options.dadosPagarReceber.length != 0) {
      this.dadosEditado = this.options.dadosPagarReceber;
    }

    this.formulario = this.formBuilder.group({
      padrao_plano_contas_pn_pagar_pk: [this.dadosEditado.padrao_plano_contas_pn_pagar_pk],
      padrao_plano_contas_pn_pagar_nome: [this.dadosEditado.padrao_plano_contas_pn_pagar_nome],
      padrao_plano_contas_multa_mora_paga_pk: [this.dadosEditado.padrao_plano_contas_multa_mora_paga_pk],
      padrao_plano_contas_multa_mora_paga_nome: [this.dadosEditado.padrao_plano_contas_multa_mora_paga_nome],
      padrao_plano_contas_juros_pago_pk: [this.dadosEditado.padrao_plano_contas_juros_pago_pk],
      padrao_plano_contas_juros_pago_nome: [this.dadosEditado.padrao_plano_contas_juros_pago_nome],
      padrao_plano_contas_descontos_obtidos_pk: [this.dadosEditado.padrao_plano_contas_descontos_obtidos_pk],
      padrao_plano_contas_descontos_obtidos_nome: [this.dadosEditado.padrao_plano_contas_descontos_obtidos_nome],
    });


    /*this.CadastrosApiService.getConfiguracoesGerais({})
      .then((s) => {
        this.dadosEditado = s;
        this.formulario = this.formBuilder.group({
          padrao_plano_contas_pn_pagar_pk: [this.dadosEditado.padrao_plano_contas_pn_pagar_pk],
          padrao_plano_contas_pn_pagar_nome: [this.dadosEditado.padrao_plano_contas_pn_pagar_nome],
          padrao_plano_contas_multa_mora_paga_pk: [this.dadosEditado.padrao_plano_contas_multa_mora_paga_pk],
          padrao_plano_contas_multa_mora_paga_nome: [this.dadosEditado.padrao_plano_contas_multa_mora_paga_nome],
          padrao_plano_contas_juros_pago_pk: [this.dadosEditado.padrao_plano_contas_juros_pago_pk],
          padrao_plano_contas_juros_pago_nome: [this.dadosEditado.padrao_plano_contas_juros_pago_nome],
          padrao_plano_contas_descontos_obtidos_pk: [this.dadosEditado.padrao_plano_contas_descontos_obtidos_pk],
          padrao_plano_contas_descontos_obtidos_nome: [this.dadosEditado.padrao_plano_contas_descontos_obtidos_nome],
        });
      })
      .catch((e) => {
        console.log(e);
      });*/
  }

  ngOnInit(): void {
  }

  ngOnDestroy():void {
    this.salvarDadosPagar();   
  }

  ngAfterViewInit() {
    this.distribuiValores();
    this.renderer.selectRootElement(this.inputSinteticaFornecedores.nativeElement).focus();
  }

  distribuiValores() {
    this.dadosEditado = [];
    if (this.options.dadosPagarReceber.length != 0) {
      this.dadosEditado = this.options.dadosPagarReceber;
    }

    this.formulario = this.formBuilder.group({
      padrao_plano_contas_pn_pagar_pk: [this.dadosEditado.padrao_plano_contas_pn_pagar_pk],
      padrao_plano_contas_pn_pagar_nome: [this.dadosEditado.padrao_plano_contas_pn_pagar_nome],
      padrao_plano_contas_multa_mora_paga_pk: [this.dadosEditado.padrao_plano_contas_multa_mora_paga_pk],
      padrao_plano_contas_multa_mora_paga_nome: [this.dadosEditado.padrao_plano_contas_multa_mora_paga_nome],
      padrao_plano_contas_juros_pago_pk: [this.dadosEditado.padrao_plano_contas_juros_pago_pk],
      padrao_plano_contas_juros_pago_nome: [this.dadosEditado.padrao_plano_contas_juros_pago_nome],
      padrao_plano_contas_descontos_obtidos_pk: [this.dadosEditado.padrao_plano_contas_descontos_obtidos_pk],
      padrao_plano_contas_descontos_obtidos_nome: [this.dadosEditado.padrao_plano_contas_descontos_obtidos_nome],
    });
  }

  salvarDadosPagar() {
    this.options.salvarConfiguracoesPagar(this.formulario.value);
    this.options.buscaConfiguracoesGerais;
    this.distribuiValores();
  }


  onChangeSinteticaFornecedores() {
    this.FinanceiroApiService.getTipoContaCaixaBuscaAutomatica(
      {
        'pesquisa': this.inputSinteticaFornecedores.nativeElement.value,
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

  onSelectionChangeSinteticaFornecedores($event) {
    this.filteredDadosContaCaixa$ = this.getFilteredOptionsContaCaixa($event);
    if (this.dadosContaCaixa !== undefined) {
      if (this.dadosContaCaixa.length !== 0) {
        this.pk_filteredDadosContaCaixa = this.dadosContaCaixa.filter((item) => {
          return item.nome === $event;
        });
        this.ContaCaixa_codigo = Number(this.pk_filteredDadosContaCaixa[0].pk);
        this.formulario.controls['padrao_plano_contas_pn_pagar_pk'].setValue(this.ContaCaixa_codigo);
        //console.log(this.formulario.value);
      }
    }
  }

  onChangeRazaoMultas() {
    this.FinanceiroApiService.getTipoContaCaixaBuscaAutomatica(
      {
        'pesquisa': this.InputRazaoMultas.nativeElement.value,
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

  onSelectionChangeRazaoMultas($event) {
    this.filteredDadosContaCaixa$ = this.getFilteredOptionsContaCaixa($event);
    if (this.dadosContaCaixa !== undefined) {
      if (this.dadosContaCaixa.length !== 0) {
        this.pk_filteredDadosContaCaixa = this.dadosContaCaixa.filter((item) => {
          return item.nome === $event;
        });
        this.ContaCaixa_codigo = Number(this.pk_filteredDadosContaCaixa[0].pk);
        this.formulario.controls['padrao_plano_contas_multa_mora_paga_pk'].setValue(this.ContaCaixa_codigo);
        //console.log(this.formulario.value);
      }
    }
  }

  onChangeRazaoJuros() {
    this.FinanceiroApiService.getTipoContaCaixaBuscaAutomatica(
      {
        'pesquisa': this.inputRazaoJuros.nativeElement.value,
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

  onSelectionChangeRazaoJuros($event) {
    this.filteredDadosContaCaixa$ = this.getFilteredOptionsContaCaixa($event);
    if (this.dadosContaCaixa !== undefined) {
      if (this.dadosContaCaixa.length !== 0) {
        this.pk_filteredDadosContaCaixa = this.dadosContaCaixa.filter((item) => {
          return item.nome === $event;
        });
        this.ContaCaixa_codigo = Number(this.pk_filteredDadosContaCaixa[0].pk);
        this.formulario.controls['padrao_plano_contas_juros_pago_pk'].setValue(this.ContaCaixa_codigo);
        //console.log(this.formulario.value);
      }
    }
  }

  onChangeRazaoDescontos() {
    this.FinanceiroApiService.getTipoContaCaixaBuscaAutomatica(
      {
        'pesquisa': this.inputRazaoDescontos.nativeElement.value,
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

  onSelectionChangeRazaoDescontos($event) {
    this.filteredDadosContaCaixa$ = this.getFilteredOptionsContaCaixa($event);
    if (this.dadosContaCaixa !== undefined) {
      if (this.dadosContaCaixa.length !== 0) {
        this.pk_filteredDadosContaCaixa = this.dadosContaCaixa.filter((item) => {
          return item.nome === $event;
        });
        this.ContaCaixa_codigo = Number(this.pk_filteredDadosContaCaixa[0].pk);
        this.formulario.controls['padrao_plano_contas_descontos_obtidos_pk'].setValue(this.ContaCaixa_codigo);
        //console.log(this.formulario.value);
      }
    }
  }

  /*onSelectionChangeContaCaixa($event) {
    this.filteredDadosContaCaixa$ = this.getFilteredOptionsContaCaixa($event);
    if (this.dadosContaCaixa !== undefined) {
      if (this.dadosContaCaixa.length !== 0) {
        this.pk_filteredDadosContaCaixa = this.dadosContaCaixa.filter((item) => {
          return item.nome === $event;
        });
        this.ContaCaixa_codigo = Number(this.pk_filteredDadosContaCaixa[0].pk);
        this.formulario.controls['padrao_plano_contas_pn_pagar_pk'].setValue(this.ContaCaixa_codigo);
        //console.log(this.formulario.value);
      }
    }
  }*/

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
