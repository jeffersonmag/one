import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CadastroFinanceiroComponent } from '../cadastro-financeiro.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { FinanceiroApiService } from '../../../../api/financeiro';
import { map } from 'rxjs/operators';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'adicionar-parcelas',
  templateUrl: './adicionar-parcelas.component.html',
  styleUrls: ['./adicionar-parcelas.component.scss']
})
export class AdicionarParcelasComponent implements OnInit {

  dadosTD: any[];
  dadosEditado: any;
  formulario: FormGroup;
  erro: boolean = false;
  mensagem_erro: string = '';

  // Fornecedor
  filteredDadosPN$: Observable<string[]>;
  dadosPN: any[];
  pk_filteredDadosPN = [];
  nomesPN: any[];
  pn_codigo: number;
  @ViewChild('autoInputPN', { static: false }) inputPN;

  // Loja
  filteredDadosLoja$: Observable<string[]>;
  dadosLoja: any[];
  pk_filteredDadosLoja = [];
  nomesLoja: any[];
  Loja_codigo: number;
  @ViewChild('autoInputLoja', { static: false }) inputLoja;

  // Conta Caixa (Plano de contas)
  filteredDadosContaCaixa$: Observable<string[]>;
  dadosContaCaixa: any[];
  pk_filteredDadosContaCaixa = [];
  nomesContaCaixa: any[];
  ContaCaixa_codigo: number;
  @ViewChild('autoInputContaCaixa', { static: false }) inputContaCaixa;

  modalConfirmacao: NgbModalRef;

  edicaoFinanceiroParcela: boolean;
  criacaoFinanceiroParcela: boolean;
  exclusaoFinanceiroParcela: boolean;

  constructor(protected options: CadastroFinanceiroComponent,
    private formBuilder: FormBuilder,
    private modal: NgbModal,
    private FinanceiroApiService: FinanceiroApiService) {
    this.dadosTD = [];
    this.dadosContaCaixa = [];
    this.dadosLoja = [];

    this.dadosEditado = [];

    var data_vencimento: any;
    var valor: any;

    this.edicaoFinanceiroParcela = this.options.edicaoFinanceiroParcela;
    this.criacaoFinanceiroParcela = this.options.criacaoFinanceiroParcela;
    this.exclusaoFinanceiroParcela = this.options.exclusaoFinanceiroParcela;

    if (!this.options.novaParcela) {
      if (this.options.parcelaUnica !== undefined) {
        // if (this.options.parcelas.length !== 0) {
        this.dadosEditado = Object(this.options.parcelaUnica);

        if (this.dadosEditado.data_vencimento !== null) {
          data_vencimento = new Date(String(this.dadosEditado.data_vencimento.substr(0, 10)));
          data_vencimento.setDate(data_vencimento.getDate() + 1);
        }

        if (this.dadosEditado.valor !== null) {
          valor = this.dadosEditado.valor;
        } else {
          valor = 0;
        }
      }
      // }
    }

    if (valor === 0) {
      if (this.options.diferencaValorDocumentoValorParcela !== undefined ||
        this.options.diferencaValorDocumentoValorParcela !== null) {
        if (this.options.diferencaValorDocumentoValorParcela !== 0) {
          valor = this.options.diferencaValorDocumentoValorParcela;
        } else {
          valor = 0;
        }
      }
    }

    this.formulario = this.formBuilder.group({
      pk: [this.dadosEditado.pk],
      financeiro_documento_pk: [this.dadosEditado.financeiro_documento_pk],
      loja_pk: [this.dadosEditado.loja_pk],
      loja_nome: [this.dadosEditado.loja_nome],
      pn_pk_cliente_fornecedor: [this.dadosEditado.pn_pk_cliente_fornecedor],
      pn_nome_cliente_fornecedor: [this.dadosEditado.pn_nome_cliente_fornecedor],
      plano_de_contas_pk: [this.dadosEditado.plano_de_contas_pk],
      plano_de_contas_nome: [this.dadosEditado.plano_de_contas_nome],
      data_vencimento: [data_vencimento],
      valor: [valor],
    });

    this.formulario.value;
  }

  ngOnInit(): void {
  }

  excluirDados() {
    if (this.formulario.value.pk === null || String(this.formulario.value.pk).trim() === '') {
      this.erro = true;
      this.mensagem_erro = 'Sem dados inseridos para excluir';
      this.modalConfirmacao.close();
    } else {
      this.erro = false;
      this.mensagem_erro = '';
      this.options.excluirDadosParcela(this.formulario.value);
      this.modalConfirmacao.close();
    }
  }

  editarDados() {
    if (this.formulario.value.pk === null || String(this.formulario.value.pk).trim() === '') {
      this.erro = true;
      this.mensagem_erro = 'Sem dados para editar';
      this.modalConfirmacao.close();
    } else {
      this.erro = false;
      this.mensagem_erro = '';
      this.options.editarDadosParcela(this.formulario.value);
      this.modalConfirmacao.close();
    }
  }

  salvarDados() {
    if (this.formulario.value.valor === null || String(this.formulario.value.valor).trim() === '') {
      this.erro = true;
      this.mensagem_erro = 'Sem dados para a inserção';
      this.modalConfirmacao.close();
    } else {
      if (this.options.formulario.value.pk === null || String(this.options.formulario.value.pk).trim() === '') {
        this.erro = false;
        this.mensagem_erro = '';
        this.options.insereDadosDocumento(this.options.formulario.value, this.formulario.value);
      } else {
        this.erro = false;
        this.mensagem_erro = '';
        this.formulario.controls['pk'].setValue(this.options.formulario.value.pk);
        this.options.salvarDadosParcela(this.formulario.value);
      }
    }
  }


  confirmacaoExclusao(modal) {
    this.modalConfirmacao = this.modal.open(modal, { size: 'sm', backdrop: 'static', backdropClass: 'light-black-backdrop' });
  }

  confirmacaoEdicao(modal) {
    this.modalConfirmacao = this.modal.open(modal, { size: 'sm', backdrop: 'static', backdropClass: 'light-black-backdrop' });
  }

  onChangeLoja() {
    this.FinanceiroApiService.getLojasBuscaAutomatica(
      {
        'pesquisa': this.inputLoja.nativeElement.value,
      },
    )
      .then((s) => {
        var nomes = [];
        this.dadosLoja = s;
        for (let i of s) {
          nomes.push(String(i.nome_fantasia));
        }
        this.nomesLoja = nomes;
        this.filteredDadosLoja$ = of(nomes); // this.getFilteredOptionsPN(this.inputPN.nativeElement.value);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onSelectionChangeLoja($event) {
    this.filteredDadosLoja$ = this.getFilteredOptionsPN($event);
    if (this.dadosLoja.length !== 0 && this.dadosLoja !== undefined) {
      this.pk_filteredDadosLoja = this.dadosLoja.filter((item) => {
        return item.nome_fantasia === $event;
      });
      this.Loja_codigo = Number(this.pk_filteredDadosLoja[0].pk);
      this.formulario.controls['loja_pk'].setValue(this.Loja_codigo);
      console.log(this.formulario.value);
    }
  }

  getFilteredOptionsLoja(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filterLoja(filterString)),
    );
  }

  private filterLoja(value: string): string[] {
    const filterValue = value.toLowerCase();
    if (this.nomesLoja !== undefined) {
      return this.nomesLoja.filter(optionValue => value.toLowerCase().includes(filterValue));
    }
  }

  onChangePN() {
    this.FinanceiroApiService.getParceiroNegociosBuscaAutomatica(
      {
        'pesquisa': this.inputPN.nativeElement.value,
      },
    )
      .then((s) => {
        var nomes = [];
        this.dadosPN = s;
        for (let i of s) {
          nomes.push(String(i.nome));
        }
        this.nomesPN = nomes;
        this.filteredDadosPN$ = of(nomes); // this.getFilteredOptionsPN(this.inputPN.nativeElement.value);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onSelectionChangePN($event) {
    this.filteredDadosPN$ = this.getFilteredOptionsPN($event);
    if (this.dadosPN.length !== 0 && this.dadosPN !== undefined) {
      this.pk_filteredDadosPN = this.dadosPN.filter((item) => {
        return item.nome === $event;
      });
      this.pn_codigo = Number(this.pk_filteredDadosPN[0].pk);
      this.formulario.controls['pn_pk_cliente_fornecedor'].setValue(this.pn_codigo);
      console.log(this.formulario.value);
    }
  }

  getFilteredOptionsPN(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filterPN(filterString)),
    );
  }

  private filterPN(value: string): string[] {
    const filterValue = value.toLowerCase();
    if (this.nomesPN !== undefined) {
      return this.nomesPN.filter(optionValue => value.toLowerCase().includes(filterValue));
    }
  }


  onChangeContaCaixa() {
    this.FinanceiroApiService.getTipoContaCaixaBuscaAutomatica(
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
    this.filteredDadosContaCaixa$ = this.getFilteredOptionsPN($event);
    if (this.dadosContaCaixa.length !== 0 && this.dadosContaCaixa !== undefined) {
      this.pk_filteredDadosContaCaixa = this.dadosContaCaixa.filter((item) => {
        return item.nome === $event;
      });
      this.ContaCaixa_codigo = Number(this.pk_filteredDadosContaCaixa[0].pk);
      this.formulario.controls['plano_de_contas_pk'].setValue(this.ContaCaixa_codigo);
      console.log(this.formulario.value);
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
