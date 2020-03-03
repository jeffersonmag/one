import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { LojasComponent } from '../lojas.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CadastrosApiService } from '../../../../api/cadastros';

@Component({
  selector: 'dados-cadastro-lojas',
  templateUrl: './dados-cadastro-lojas.component.html',
  styleUrls: ['./dados-cadastro-lojas.scss'],
})
export class DadosCadastroLojasComponent implements OnInit, OnDestroy {

  dadosEditado: any;
  edicaoUsuario: boolean;
  criacaoUsuario: boolean;
  permissaoExclusao: boolean;
  formulario: FormGroup;
  selectedOption;
  erro: boolean = false;
  mensagem_erro: string = '';
  modalConfirmacao: NgbModalRef;
  interval: any;

  public contimer: number = 0;

  dadosPN: any[];
  dadosTL: any[];
  dadosCV: any[];
  nomesPN: any[];
  nomesTL: any[];
  nomesCV: any[];
  tipo_canal_venda_pk: number;
  tipo_loja_pk: number;
  pn_codigo: number;
  filteredDadosPN$: Observable<string[]>;
  filteredDadosTL$: Observable<string[]>;
  filteredDadosCV$: Observable<string[]>;
  pk_filteredDadosPN = [];
  pk_filteredDadosTL = [];
  pk_filteredDadosCV = [];
  @ViewChild('autoInputPN', { static: false }) inputPN;
  @ViewChild('autoInputTL', { static: false }) inputTL;
  @ViewChild('autoInputCV', { static: false }) inputCV;

  mascaraTelefone = ['(00) 0000-00009', '(00) 00000-0000'];

  constructor(private options: LojasComponent,
    private campanhasApiService: CadastrosApiService,
    private modal: NgbModal,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.dadosEditado = [];
    this.edicaoUsuario = this.options.edicaoUsuario;
    this.criacaoUsuario = this.options.criacaoUsuario;
    this.permissaoExclusao = this.options.permissaoDelete;

    var telefone1: string = '';
    var telefone2: string = '';
    var pessoa_de_contato: string = '';
    var celular: string = '';

    if (this.options.lojasEdicao.length !== 0) {
      this.dadosEditado = this.options.lojasEdicao;
    }

    if (this.dadosEditado.telefone !== null && this.dadosEditado.telefone !== undefined) {
      telefone1 = String(this.dadosEditado.telefone);
    }
    if (this.dadosEditado.telefone2 !== null && this.dadosEditado.telefone2 !== undefined) {
      telefone2 = String(this.dadosEditado.telefone2);
    }
    if (this.dadosEditado.celular !== null && this.dadosEditado.celular !== undefined) {
      celular = String(this.dadosEditado.celular);
    }
    if (this.dadosEditado.pessoa_de_contato !== null && this.dadosEditado.pessoa_de_contato !== undefined) {
      pessoa_de_contato = String(this.dadosEditado.pessoa_de_contato);
    }

    this.dadosPN = [];
    this.dadosTL = [];
    this.dadosCV = [];

    this.filteredDadosPN$ = of(this.dadosPN);
    this.filteredDadosTL$ = of(this.dadosTL);
    this.filteredDadosCV$ = of(this.dadosCV);

    this.formulario = this.formBuilder.group({
      pk: [this.dadosEditado.pk],
      pn_codigo: [this.dadosEditado.pn_codigo],
      pn_nome: [this.dadosEditado.nome_fantasia_pn],
      ativo: [this.dadosEditado.ativo],
      nome_fantasia: [this.dadosEditado.nome_fantasia],
      telefone1: [telefone1],
      telefone2: [telefone2],
      celular: [celular],
      pessoa_de_contato: [pessoa_de_contato],
      email_diretoria: [this.dadosEditado.email_diretoria],
      email_financeiro: [this.dadosEditado.email_financeiro],
      email_cadastro: [this.dadosEditado.email_cadastro],
      email_fisico: [this.dadosEditado.email_fisico],
      tipo_canal_venda_pk: [this.dadosEditado.tipo_canal_venda_pk],
      tipo_loja_pk: [this.dadosEditado.tipo_loja_pk],
      tipo_canal_venda_nome: [this.dadosEditado.tipo_canal_venda_nome],
      tipo_loja_nome: [this.dadosEditado.tipo_loja_nome],
      anotacao: [this.dadosEditado.anotacao],
    });
  }

  ngOnDestroy() {
    this.dadosEditado = [];
  }

  private filterPN(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.nomesPN.filter(optionValue => value.toLowerCase().includes(filterValue));
  }

  private filterCV(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.nomesCV.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  private filterTL(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.nomesTL.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  getFilteredOptionsPN(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filterPN(filterString)),
    );
  }

  getFilteredOptionsCV(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filterCV(filterString)),
    );
  }

  getFilteredOptionsTL(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filterTL(filterString)),
    );
  }

  onChangePN() {
    this.campanhasApiService.getParceiroNegociosBuscaAutomatica(
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

  /*onChangePNTime() {
    // clearTimeout(timeout);
    let valor: string = String(this.inputPN.nativeElement.value);
    this.contimer = this.contimer + 1;
    var timeout = setTimeout(function () {
      if (this.contimer > 3) {
        this.contimer = 0;
        clearTimeout(timeout);
        console.log(valor);
      } else { console.log('menos que 3 segundos'); }
    }, 1000);
  }*/

  onChangeCV() {
    this.campanhasApiService.getCanalVendasBuscaAutomatica(
      {
        'pesquisa': this.inputCV.nativeElement.value,
      },
    )
      .then((s) => {
        var nomes = [];
        this.dadosCV = s;
        for (let i of s) {
          nomes.push(String(i.nome));
        }
        this.nomesCV = nomes;
        this.filteredDadosCV$ = of(nomes); // this.getFilteredOptionsCV(this.inputCV.nativeElement.value);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onChangeTL() {
    this.campanhasApiService.getTipoLojasBuscaAutomatica(
      {
        'pesquisa': this.inputTL.nativeElement.value,
      },
    )
      .then((s) => {
        var nomes = [];
        this.dadosTL = s;
        for (let i of s) {
          nomes.push(String(i.nome));
        }
        this.nomesTL = nomes;
        this.filteredDadosTL$ = of(nomes); // this.getFilteredOptionsTL(this.inputTL.nativeElement.value);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onSelectionChangePN($event) {
    this.filteredDadosPN$ = this.getFilteredOptionsPN($event);
    this.pk_filteredDadosPN = this.dadosPN.filter((item) => {
      return item.nome === $event;
    });
    this.pn_codigo = Number(this.pk_filteredDadosPN[0].pk);
    this.formulario.controls['pn_codigo'].setValue(this.pn_codigo);
    console.log(this.formulario.value);
  }

  onSelectionChangeCV($event) {
    this.filteredDadosCV$ = this.getFilteredOptionsCV($event);
    this.pk_filteredDadosCV = this.dadosCV.filter((item) => {
      return item.nome === $event;
    });
    this.tipo_canal_venda_pk = Number(this.pk_filteredDadosCV[0].pk);
    this.formulario.controls['tipo_canal_venda_pk'].setValue(this.tipo_canal_venda_pk);
    console.log(this.formulario.value);
  }

  onSelectionChangeTL($event) {
    this.filteredDadosTL$ = this.getFilteredOptionsTL($event);
    this.pk_filteredDadosTL = this.dadosTL.filter((item) => {
      return item.nome === $event;
    });
    this.tipo_loja_pk = Number(this.pk_filteredDadosTL[0].pk);
    this.formulario.controls['tipo_loja_pk'].setValue(this.tipo_loja_pk);
    console.log(this.formulario.value);
  }

  salvarDados() {
    if (this.formulario.value.nome_fantasia === null || this.formulario.value.nome_fantasia.trim() === '') {
      this.erro = true;
      this.mensagem_erro = 'Informe os dados necessários para continuar';
    } else {
      this.erro = false;
      this.mensagem_erro = '';
      this.options.insereLojas(this.formulario.value);
    }
  }

  editarDados() {
    if (this.formulario.value.nome_fantasia === null || this.formulario.value.nome_fantasia.trim() === '') {
      this.erro = true;
      this.mensagem_erro = 'Informe os dados necessários para continuar';
      this.modalConfirmacao.close();
    } else {
      this.erro = false;
      this.mensagem_erro = '';
      this.options.alteraLojas(this.formulario.value);
      this.modalConfirmacao.close();
    }
  }

  excluirDados() {
    if (this.formulario.value.pk === null || this.formulario.value.pk === '') {
      this.erro = true;
      this.mensagem_erro = 'Sem dados inseridos para excluir';
      this.modalConfirmacao.close();
    } else {
      this.erro = false;
      this.mensagem_erro = '';
      this.options.excluirLojas(this.formulario.value);
      this.modalConfirmacao.close();
    }
  }

  confirmacaoExclusao(modal) {
    this.modalConfirmacao = this.modal.open(modal, { size: 'sm', backdrop: 'static' });
  }

  confirmacaoEdicao(modal) {
    this.modalConfirmacao = this.modal.open(modal, { size: 'sm', backdrop: 'static' });
  }

  Close() {
    this.dadosEditado = [];
    this.options.JoinAndClose();
  }
}
