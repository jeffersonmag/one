import { Component, OnInit, ViewChild, Renderer2, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CadastrosApiService } from '../../../../api/cadastros';
import { FinanceiroApiService } from '../../../../api/financeiro';
import { FormGroup, FormBuilder } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ConfiguracoesComponent } from '../configuracoes.component';

@Component({
  selector: 'configuracoes-receber',
  templateUrl: './configuracoes-receber.component.html',
  styleUrls: ['./configuracoes-receber.component.css']
})
export class ConfiguracoesReceberComponent implements OnInit, OnDestroy {

  // Conta Caixa (Plano de contas)
  filteredDadosContaCaixa$: Observable<string[]>;
  dadosContaCaixa: any[];
  pk_filteredDadosContaCaixa = [];
  nomesContaCaixa: any[];
  ContaCaixa_codigo: number;
  @ViewChild('autoInputContaCaixa', { static: false }) inputContaCaixa;
  @ViewChild('autoInputSinteticaClientes', { static: false }) inputSinteticaClientes;
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
      padrao_plano_contas_pn_receber_pk: [this.dadosEditado.padrao_plano_contas_pn_receber_pk],
      padrao_plano_contas_pn_receber_nome: [this.dadosEditado.padrao_plano_contas_pn_receber_nome],
      padrao_plano_contas_multa_mora_recebida_pk: [this.dadosEditado.padrao_plano_contas_multa_mora_recebida_pk],
      padrao_plano_contas_multa_mora_recebida_nome: [this.dadosEditado.padrao_plano_contas_multa_mora_recebida_nome],
      padrao_plano_contas_juros_recebido_pk: [this.dadosEditado.padrao_plano_contas_juros_recebido_pk],
      padrao_plano_contas_juros_recebido_nome: [this.dadosEditado.padrao_plano_contas_juros_recebido_nome],
      padrao_plano_contas_descontos_concedidos_pk: [this.dadosEditado.padrao_plano_contas_descontos_concedidos_pk],
      padrao_plano_contas_descontos_concedidos_nome: [this.dadosEditado.padrao_plano_contas_descontos_concedidos_nome],
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy():void {
    this.salvarDadosreceber();   
  }

  ngAfterViewInit() {
    this.distribuiValores();
    this.renderer.selectRootElement(this.inputSinteticaClientes.nativeElement).focus();
  }

  distribuiValores() {
    this.dadosEditado = [];
    if (this.options.dadosPagarReceber.length != 0) {
      this.dadosEditado = this.options.dadosPagarReceber;
    }

    this.formulario = this.formBuilder.group({
      padrao_plano_contas_pn_receber_pk: [this.dadosEditado.padrao_plano_contas_pn_receber_pk],
      padrao_plano_contas_pn_receber_nome: [this.dadosEditado.padrao_plano_contas_pn_receber_nome],
      padrao_plano_contas_multa_mora_recebida_pk: [this.dadosEditado.padrao_plano_contas_multa_mora_recebida_pk],
      padrao_plano_contas_multa_mora_recebida_nome: [this.dadosEditado.padrao_plano_contas_multa_mora_recebida_nome],
      padrao_plano_contas_juros_recebido_pk: [this.dadosEditado.padrao_plano_contas_juros_recebido_pk],
      padrao_plano_contas_juros_recebido_nome: [this.dadosEditado.padrao_plano_contas_juros_recebido_nome],
      padrao_plano_contas_descontos_concedidos_pk: [this.dadosEditado.padrao_plano_contas_descontos_concedidos_pk],
      padrao_plano_contas_descontos_concedidos_nome: [this.dadosEditado.padrao_plano_contas_descontos_concedidos_nome],
    });
  }

  salvarDadosreceber() {
    this.options.salvarConfiguracoesReceber(this.formulario.value);
    this.options.buscaConfiguracoesGerais;
    this.distribuiValores();
  }


  onChangeSinteticaClientes() {
    this.FinanceiroApiService.getTipoContaCaixaBuscaAutomatica(
      {
        'pesquisa': this.inputSinteticaClientes.nativeElement.value,
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

  onSelectionChangeSinteticaClientes($event) {
    this.filteredDadosContaCaixa$ = this.getFilteredOptionsContaCaixa($event);
    if (this.dadosContaCaixa !== undefined) {
      if (this.dadosContaCaixa.length !== 0) {
        this.pk_filteredDadosContaCaixa = this.dadosContaCaixa.filter((item) => {
          return item.nome === $event;
        });
        this.ContaCaixa_codigo = Number(this.pk_filteredDadosContaCaixa[0].pk);
        this.formulario.controls['padrao_plano_contas_pn_receber_pk'].setValue(this.ContaCaixa_codigo);
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
        this.formulario.controls['padrao_plano_contas_multa_mora_recebida_pk'].setValue(this.ContaCaixa_codigo);
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
        this.formulario.controls['padrao_plano_contas_juros_recebido_pk'].setValue(this.ContaCaixa_codigo);
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
        this.formulario.controls['padrao_plano_contas_descontos_concedidos_pk'].setValue(this.ContaCaixa_codigo);
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
        this.formulario.controls['padrao_plano_contas_pn_receber_pk'].setValue(this.ContaCaixa_codigo);
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
