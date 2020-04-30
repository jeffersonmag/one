import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FinanceiroComponent } from '../financeiro.component';
import { FinanceiroApiService } from '../../../api/financeiro';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NbDialogService, NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-cadastro-financeiro',
  templateUrl: './cadastro-financeiro.component.html',
  styleUrls: ['./cadastro-financeiro.component.scss'],
})
export class CadastroFinanceiroComponent implements OnInit, OnDestroy {

  dadosEditado: any;
  edicaoFinanceiroDocumento: boolean;
  criacaoFinanceiroDocumento: boolean;
  edicaoFinanceiroParcela: boolean;
  criacaoFinanceiroParcela: boolean;
  exclusaoFinanceiroParcela: boolean;
  key: string;

  currentPage = 1;
  itemsPerPage = 20;
  pageSize: number;

  permissaoExclusao: boolean;
  formulario: FormGroup;
  selectedOption;
  erro: boolean = false;
  novaParcela: boolean = true;
  mensagem_erro: string = '';
  modalConfirmacao: NgbModalRef;
  dialogReference: NbDialogRef<any>;

  total_parcelas = 0;
  total_documento_alcancado = false;
  pk_documento: any;
  diferencaValorDocumentoValorParcela: any;

  // Projetos
  filteredDadosProjetos$: Observable<string[]>;
  dadosProjetos: any[];
  pk_filteredDadosProjetos = [];
  nomesProjetos: any[];
  Projetos_codigo: number;
  @ViewChild('autoInputProjetos', { static: false }) inputProjetos;

  dadosTD: any[];
  nomesTD: any[];
  parcelas: any[];
  parcelaUnica: any[];
  pk_filteredDadosTD = [];
  tipo_documentos_financeiro_pk: number;
  filteredDadosTD$: Observable<string[]>;
  @ViewChild('autoInputTD', { static: false }) inputTD;

  filteredDadosPN$: Observable<string[]>;
  dadosPN: any[];
  pk_filteredDadosPN = [];
  nomesPN: any[];
  pn_codigo: number;
  @ViewChild('autoInputPN', { static: false }) inputPN;

  constructor(private formBuilder: FormBuilder,
    private options: FinanceiroComponent,
    private modal: NgbModal,
    private FinanceiroApiService_: FinanceiroApiService,
    private dialogService: NbDialogService) {
  }

  ngOnInit(): void {
    this.dadosTD = [];
    this.dadosPN = [];

    this.filteredDadosTD$ = of(this.dadosTD);
    this.filteredDadosPN$ = of(this.dadosPN);
    this.filteredDadosProjetos$ = of(this.dadosProjetos);

    var data_emissao: any;
    var competencia: any;

    this.dadosEditado = [];
    this.parcelas = [];

    this.edicaoFinanceiroDocumento = this.options.edicaoFinanceiroDocumento;
    this.criacaoFinanceiroDocumento = this.options.criacaoFinanceiroDocumento;
    this.permissaoExclusao = this.options.permissaoDelete;

    this.edicaoFinanceiroParcela = this.options.edicaoFinanceiroParcela;
    this.criacaoFinanceiroParcela = this.options.criacaoFinanceiroParcela;
    this.exclusaoFinanceiroParcela = this.options.exclusaoFinanceiroParcela;

    if (this.options.dadosFinanceiroDocumento.length !== 0) {
      this.dadosEditado = this.options.dadosFinanceiroDocumento;

      if (this.dadosEditado.data_emissao !== null) {
        data_emissao = new Date(String(this.dadosEditado.data_emissao.substr(0, 10)));
        data_emissao.setDate(data_emissao.getDate() + 1);
      }

      if (this.dadosEditado.competencia !== null) {
        competencia = new Date(String(this.dadosEditado.competencia.substr(0, 10)));
        competencia.setDate(competencia.getDate() + 1);
      }

      this.buscaParcelasDoDocumento(this.dadosEditado.pk);
    }

    this.formulario = this.formBuilder.group({
      competencia: [competencia],
      pk: [this.dadosEditado.pk],
      data_emissao: [data_emissao],
      descricao: [this.dadosEditado.descricao],
      documento: [this.dadosEditado.documento],
      pn_nome_emissor_documento: [this.dadosEditado.pn_nome_emissor_documento],
      pn_pk_emissor_documento: [this.dadosEditado.pn_pk_emissor_documento],
      projetos_nome: [this.dadosEditado.projetos_nome],
      projetos_pk: [this.dadosEditado.projetos_pk],
      tipo: [this.dadosEditado.tipo],
      tipo_documentos_financeiro_nome: [this.dadosEditado.tipo_documentos_financeiro_nome],
      tipo_documentos_financeiro_pk: [this.dadosEditado.tipo_documentos_financeiro_pk],
      valor_total_principal: [this.dadosEditado.valor_total_principal],
    });

  }

  ngOnDestroy() {
    this.dadosEditado = [];
    if (this.dialogReference !== null && this.dialogReference !== undefined) {
      this.dialogReference.close();
    }
  }

  buscaParcelasDoDocumento(valor?: string) {
    if (valor === '' || valor === undefined) {
      if (this.pk_documento === null || this.pk_documento === undefined) {
        valor = String(this.pk_documento);
      } else { this.parcelas = []; }
    } else {
      this.FinanceiroApiService_.getParcelaFinanceiro(
        {
          'financeiro_documento_pk': valor,
        },
      )
        .then((s) => {
          this.parcelas = s;
          this.total_parcelas = 0;
          for (let i of s) {
            this.total_parcelas = this.total_parcelas + i.valor;
          }
          if (this.dadosEditado.valor_total_principal <= this.total_parcelas) {
            this.total_documento_alcancado = true;
          } else {
            this.total_documento_alcancado = false;
            this.diferencaValorDocumentoValorParcela = (this.formulario.value.valor - this.total_parcelas);
          }
        })
        .catch((e) => {
          console.log(e);
          this.options.makeToast('danger', 'Ocorreu um erro!', e.error.message);
        });
    }
  }

  salvarDados() {
    this.total_parcelas = 0;
    for (let i of this.parcelas) {
      this.total_parcelas = this.total_parcelas + i.valor;
    }
    if (this.formulario.value.valor_total_principal == this.total_parcelas) {
      this.total_documento_alcancado = true;
    } else {
      this.total_documento_alcancado = false;
      this.diferencaValorDocumentoValorParcela = (this.formulario.value.valor_total_principal - this.total_parcelas);
    }

    if (this.total_documento_alcancado) {
      this.options.JoinAndClose();
    } else {
      this.erro = true;
      this.mensagem_erro = 'Adicione a quantidade de parcelas até que atinja o valor do documento';
    }
  }

  quitarParcela(modal, parcela?) {
    this.erro = false;
    this.parcelaUnica = parcela;
    this.dialogReference = this.dialogService.open(modal,
      {
        hasBackdrop: true,
        closeOnEsc: false,
        hasScroll: true,
      });
  }

  editarDados() {
    this.total_parcelas = 0;
    for (let i of this.parcelas) {
      this.total_parcelas = this.total_parcelas + i.valor;
    }
    if (this.formulario.value.valor_total_principal == this.total_parcelas) {
      this.total_documento_alcancado = true;
    } else {
      this.total_documento_alcancado = false;
      this.diferencaValorDocumentoValorParcela = (this.formulario.value.valor_total_principal - this.total_parcelas);
    }

    if (this.total_documento_alcancado) {
      if (this.formulario.value.pk === null || String(this.formulario.value.pk).trim() === '') {
        this.erro = true;
        this.mensagem_erro = 'Informe os dados necessários para continuar';
        this.modalConfirmacao.close();
      } else {
        this.erro = false;
        this.mensagem_erro = '';
        this.options.alteraDados(this.formulario.value);
        this.modalConfirmacao.close(); // correcao edicao
      }
    } else {
      this.erro = true;
      this.mensagem_erro = 'Adicione a quantidade de parcelas até que atinja o valor do documento';
      this.modalConfirmacao.close();
    }
  }

  excluirDados() {
    if (this.formulario.value.pk === null || String(this.formulario.value.pk).trim() === '') {
      this.erro = true;
      this.mensagem_erro = 'Sem dados inseridos para excluir';
      this.modalConfirmacao.close();
    } else {
      this.erro = false;
      this.mensagem_erro = '';
      this.options.excluirDados(this.formulario.value);
      this.modalConfirmacao.close();
    }
  }

  excluirDadosParcela(formularioParcela) {
    this.excluirDadosParcelaExclusaoModal(formularioParcela);
    this.buscaParcelasDoDocumento(this.dadosEditado.pk);
  }

  editarDadosParcela(formularioParcela) {
    this.editarDadosParcelaEdicaoModal(formularioParcela, this.dadosEditado.pk);
    this.buscaParcelasDoDocumento(this.dadosEditado.pk);
  }

  salvarDadosParcela(formularioParcela) {
    this.parcelas = this.salvarDadosParcelaInsercaoModal(formularioParcela, this.formulario.value.pk);
  }

  confirmacaoExclusao(modal) {
    this.modalConfirmacao = this.modal.open(modal, { size: 'sm', backdrop: 'static', backdropClass: 'light-black-backdrop' });
  }

  confirmacaoEdicao(modal) {
    this.modalConfirmacao = this.modal.open(modal, { size: 'sm', backdrop: 'static', backdropClass: 'light-black-backdrop' });
  }

  salvarDadosParcelaInsercaoModal(valor?, pk_documento?): any {
    if (valor.data_vencimento !== null && valor.data_vencimento !== '' && valor.data_vencimento !== undefined) {
      var data_vencimento = this.options.formataData(valor.data_vencimento);
    } else {
      data_vencimento = null;
    }
    this.FinanceiroApiService_.postParcelaFinanceiro(
      {
        'data_vencimento': data_vencimento,
        'financeiro_documento_pk': pk_documento,
        'loja_nome': valor.loja_nome,
        'loja_pk': valor.loja_pk,
        'parcela': valor.parcela,
        'parcela_de': valor.parcela_de,
        'plano_de_contas_nome': valor.plano_de_contas_nome,
        'plano_de_contas_pk': valor.plano_de_contas_pk,
        'pn_nome_cliente_fornecedor': valor.pn_nome_cliente_fornecedor,
        'pn_pk_cliente_fornecedor': valor.pn_pk_cliente_fornecedor,
        'valor': valor.valor,
      },
    )
      .then((s) => {
        this.options.makeToast('success', 'Sucesso!', 'Dados incluídos com sucesso!');
        this.buscaParcelasDoDocumento(String(this.formulario.value.pk));
        this.dialogReference.close();
      })
      .catch((e) => {
        this.options.makeToast('danger', 'Erro!', e.error.message);
        this.buscaParcelasDoDocumento(String(this.formulario.value.pk));
      });
  }

  SalvarQuitarParcela(valor?, pk_documento?): any {
    if (valor.data_pagamento_recebimento !== null && valor.data_pagamento_recebimento !== '' && valor.data_pagamento_recebimento !== undefined) {
      var data_pagamento_recebimento = this.options.formataData(valor.data_pagamento_recebimento);
    } else {
      data_pagamento_recebimento = null;
    }
    this.FinanceiroApiService_.postQuitarParcelaFinanceiro({
      'codigo_plano_conta': valor.codigo_plano_conta,
      'valor_evento': Number(valor.valor_evento),
      'financeiro_parcela_pk': valor.financeiro_parcela_pk,
      'multa_mora': Number(valor.multa_mora),
      'juros': Number(valor.juros),
      'descontos': Number(valor.descontos),
      'data_pagamento_recebimento': data_pagamento_recebimento
    },
    )
      .then((s) => {
        this.options.makeToast('success', 'Sucesso!', 'Parcela Quitada com sucesso!');
        this.buscaParcelasDoDocumento(String(this.formulario.value.pk));
        this.dialogReference.close();
      })
      .catch((e) => {
        this.options.makeToast('danger', 'Erro!', e.error.message);
        this.buscaParcelasDoDocumento(String(this.formulario.value.pk));
      });
  }

  excluirDadosParcelaExclusaoModal(valor?) {
    this.FinanceiroApiService_.delParcelaFinanceiro(
      {
        'pk': valor.pk,
      },
    )
      .then((s) => {
        //this.options.JoinAndClose();
        this.options.makeToast('success', 'Sucesso!', 'Dados excluído com sucesso!');
        this.options.buscaDados(this.options.value);
        this.buscaParcelasDoDocumento(String(this.formulario.value.pk));
        this.dialogReference.close();
      })
      .catch((e) => {
        //this.options.JoinAndClose();
        this.options.makeToast('danger', 'Erro!', e.error.message);
      });
  }

  editarDadosParcelaEdicaoModal(valor?, pk_documento?) {
    if (valor.data_vencimento !== null && valor.data_vencimento !== '' && valor.data_vencimento !== undefined) {
      var data_vencimento = this.options.formataData(valor.data_vencimento);
    } else {
      data_vencimento = null;
    }
    this.FinanceiroApiService_.putParcelaFinanceiro(
      {
        'data_vencimento': data_vencimento,
        'financeiro_documento_pk': pk_documento,
        'loja_nome': valor.loja_nome,
        'loja_pk': valor.loja_pk,
        'parcela': valor.parcela,
        'parcela_de': valor.parcela_de,
        'plano_de_contas_nome': valor.plano_de_contas_nome,
        'plano_de_contas_pk': valor.plano_de_contas_pk,
        'pn_nome_cliente_fornecedor': valor.pn_nome_cliente_fornecedor,
        'pn_pk_cliente_fornecedor': valor.pn_pk_cliente_fornecedor,
        'valor': valor.valor,
        'pk': valor.pk
      },
    )
      .then((s) => {
        //this.JoinAndClose();
        this.options.makeToast('success', 'Sucesso!', 'Dados editados com sucesso!');
        this.options.buscaDados(this.options.value);
        this.buscaParcelasDoDocumento(String(this.formulario.value.pk));
        this.dialogReference.close();
      })
      .catch((e) => {
        this.options.makeToast('danger', 'Erro!', e.error.message);
        this.buscaParcelasDoDocumento(String(this.formulario.value.pk));
      });
  }

  onChangeProjetos() {
    this.FinanceiroApiService_.getProjetosAutomatica(
      {
        'pesquisa': this.inputProjetos.nativeElement.value,
      },
    )
      .then((s) => {
        var nomes = [];
        this.dadosProjetos = s;
        for (let i of s) {
          nomes.push(String(i.nome));
        }
        this.nomesProjetos = nomes;
        this.filteredDadosProjetos$ = of(nomes); // this.getFilteredOptionsPN(this.inputPN.nativeElement.value);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onSelectionChangeProjetos($event) {
    this.filteredDadosProjetos$ = this.getFilteredOptionsProjetos($event);
    if (this.dadosProjetos.length !== 0 && this.dadosProjetos !== undefined) {
      this.pk_filteredDadosProjetos = this.dadosProjetos.filter((item) => {
        return item.nome === $event;
      });
      this.Projetos_codigo = Number(this.pk_filteredDadosProjetos[0].pk);
      this.formulario.controls['projetos_pk'].setValue(this.Projetos_codigo);
      console.log(this.formulario.value);
    }
  }

  getFilteredOptionsProjetos(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filterProjetos(filterString)),
    );
  }

  private filterProjetos(value: string): string[] {
    const filterValue = value.toLowerCase();
    if (this.nomesProjetos !== undefined) {
      return this.nomesProjetos.filter(optionValue => value.toLowerCase().includes(filterValue));
    }
  }

  onChangeTD() {
    this.FinanceiroApiService_.getTipoDocumentoFinanceiroBuscaAutomatica(
      {
        'pesquisa': this.inputTD.nativeElement.value,
      },
    )
      .then((s) => {
        var nomes = [];
        this.dadosTD = s;
        for (let i of s) {
          nomes.push(String(i.nome));
        }
        this.nomesTD = nomes;
        this.filteredDadosTD$ = of(nomes); // this.getFilteredOptionsPN(this.inputPN.nativeElement.value);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onSelectionChangeTD($event) {
    this.filteredDadosTD$ = this.getFilteredOptionsTD($event);
    if (this.dadosTD.length !== 0) {
      this.pk_filteredDadosTD = this.dadosTD.filter((item) => {
        return item.nome === $event;
      });
      this.tipo_documentos_financeiro_pk = Number(this.pk_filteredDadosTD[0].pk);
      this.formulario.controls['tipo_documentos_financeiro_pk'].setValue(this.tipo_documentos_financeiro_pk);
    }
  }

  getFilteredOptionsTD(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filterTD(filterString)),
    );
  }

  private filterTD(value: string): string[] {
    const filterValue = value.toLowerCase();
    if (this.nomesTD !== undefined) {
      return this.nomesTD.filter(optionValue => value.toLowerCase().includes(filterValue));
    }
  }

  onChangePN() {
    this.FinanceiroApiService_.getParceiroNegociosBuscaAutomatica(
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
    if (this.dadosPN.length !== 0) {
      this.pk_filteredDadosPN = this.dadosPN.filter((item) => {
        return item.nome === $event;
      });
      this.pn_codigo = Number(this.pk_filteredDadosPN[0].pk);
      this.formulario.controls['pn_pk_emissor_documento'].setValue(this.pn_codigo);
      // console.log(this.formulario.value);
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

  adicionarParcelas(modal) {
    this.erro = false;
    if (this.formulario.value.pk === null || String(this.formulario.value.pk).trim() === '') {
      if (this.formulario.value.documento === null || this.formulario.value.documento.trim() === '') {
        if (this.formulario.value.valor_total_principal === null ||
          this.formulario.value.valor_total_principal.trim() === '' ||
          this.formulario.value.valor_total_principal === 0) {
          this.erro = true;
          this.mensagem_erro = 'Informe os dados necessários para continuar';
        }
      } else {
        this.total_parcelas = 0;
        for (let i of this.parcelas) {
          this.total_parcelas = this.total_parcelas + i.valor;
        }
        if (this.formulario.value.valor_total_principal === this.total_parcelas) {
          this.total_documento_alcancado = true;
        } else {
          this.total_documento_alcancado = false;
          this.diferencaValorDocumentoValorParcela =
            (this.formulario.value.valor_total_principal - this.total_parcelas);
        }
        this.novaParcela = true;
        this.dialogReference = this.dialogService.open(modal,
          {
            hasBackdrop: true,
            closeOnEsc: false,
            hasScroll: true,
          });
      }
    } else {
      this.total_parcelas = 0;
      for (let i of this.parcelas) {
        this.total_parcelas = this.total_parcelas + i.valor;
      }
      if (this.formulario.value.valor_total_principal === this.total_parcelas) {
        this.total_documento_alcancado = true;
      } else {
        this.total_documento_alcancado = false;
        this.diferencaValorDocumentoValorParcela = (this.formulario.value.valor_total_principal - this.total_parcelas);
      }
      this.options.alteraDados(this.formulario.value);
      this.erro = false;
      this.novaParcela = true;
      this.dialogReference = this.dialogService.open(modal,
        {
          hasBackdrop: true,
          closeOnEsc: false,
          hasScroll: true,
        });
    }
  }

  insereDadosDocumento(valorDocumento?, valorParcela?) {
    if (valorDocumento.data_emissao !== null && valorDocumento.data_emissao !== ''
      && valorDocumento.data_emissao !== undefined) {
      var data_emissao = this.options.formataData(valorDocumento.data_emissao);
    }
    if (valorDocumento.competencia !== null && valorDocumento.competencia !== ''
      && valorDocumento.competencia !== undefined) {
      var competencia = this.options.formataData(valorDocumento.competencia);
    }
    this.FinanceiroApiService_.postDocumentoFinanceiro(
      {
        'competencia': competencia,
        'data_emissao': data_emissao,
        'descricao': valorDocumento.descricao,
        'documento': valorDocumento.documento,
        'pn_pk_emissor_documento': valorDocumento.pn_pk_emissor_documento,
        'projetos_nome': valorDocumento.projetos_nome,
        'projetos_pk': valorDocumento.projetos_pk,
        'tipo': 'P',
        'tipo_documentos_financeiro_pk': valorDocumento.tipo_documentos_financeiro_pk,
        'valor_total_principal': valorDocumento.valor_total_principal,
      },
    )
      .then((s) => {
        // this.JoinAndClose();
        this.pk_documento = s.codigo;
        this.options.makeToast('success', 'Sucesso!', 'Dados Financeiros inseridos com sucesso!');
        this.formulario.controls['pk'].setValue(this.pk_documento);
        this.salvarDadosParcela(valorParcela);
        this.options.buscaDados(this.options.value);
      })
      .catch((e) => {
        // this.JoinAndClose();
        let stringErros = '';
        let error = e.error.errors;
        let testeobj = []; //seu array de objetos
        testeobj.push(error);
        const values = Object.keys(error).map(key => error[key]);
        const chave = Object.keys(error).map(key => key);
        for (let i in values) {
          stringErros = chave[Number(i)] + ': ' + values[Number(i)];
          stringErros = this.buscaErro(stringErros, chave[Number(i)]);
          this.options.makeToast('danger', 'Erro no campo: \n' + chave[Number(i)] + ' no cadastro', stringErros);
        }
      });
  }

  buscaErro(mensagem, campo) {
    var dicionario = {}; //criando o dicionário com valor de objeto vazio

    dicionario["long"] = 'Valor do campo ' + campo + ' muito grande!'; //colocando um valor na chave "key"
    dicionario["number"] = "Era esperado um número no campo " + campo;
    dicionario["date"] = "Era esperado uma data no campo " + campo;

    const chaveDicionario = Object.keys(dicionario).map(key => key);
    const MensagemDicionario = Object.keys(dicionario).map(key => dicionario[key]);

    for (let i in chaveDicionario) {
      if (mensagem.search(chaveDicionario[Number(i)]) == -1) {
        return mensagem;
      } else {
        return MensagemDicionario[Number(i)];
      }
    }

    //fazendo uma verificação para ver se existe valor para a chave "erro" dentro do nosso dicionario
    if (!dicionario["erro"]) {
      console.log("ops, não existe valor para a chave erro"); //não existe valor
    } else {
      console.log("uhul! existe valor para a chave erro"); //existe valor
    }

    //fazendo uma verificação para ver se existe valor para a chave "key" dentro do nosso dicionario
    if (!dicionario["key"]) {
      console.log("ops, não existe valor para a chave key"); //não existe valor
    } else {
      console.log("uhul! existe valor para a chave key e seu valor é " + dicionario["key"]); //existe valor
    }

  }

  editarParcelas(modal, financeiro?) {
    // this.parcelas = financeiro;
    this.parcelaUnica = financeiro;
    this.novaParcela = false;
    this.dialogReference = this.dialogService.open(modal,
      {
        hasBackdrop: true,
        closeOnEsc: false,
        hasScroll: true,
      });
  }

  VerificaAlteracao() {
    this.total_parcelas = 0;
    for (let i of this.parcelas) {
      this.total_parcelas = this.total_parcelas + i.valor;
    }
    if (this.formulario.value.valor_total_principal == this.total_parcelas) {
      this.total_documento_alcancado = true;
    } else {
      this.total_documento_alcancado = false;
      this.diferencaValorDocumentoValorParcela = (this.formulario.value.valor_total_principal - this.total_parcelas);
    }
  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }

  Close() {
    this.dadosEditado = [];
    this.options.JoinAndClose();
  }

}
