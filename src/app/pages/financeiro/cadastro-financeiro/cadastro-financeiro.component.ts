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

  dadosTD: any[];
  nomesTD: any[];
  parcelas: any[];
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
  }

  buscaParcelasDoDocumento(valor?: string) {
    if (valor === '' || valor === undefined) {
      this.parcelas = [];
    } else {
      this.FinanceiroApiService_.getParcelaFinanceiro(
        {
          'financeiro_documento_pk': valor,
        },
      )
        .then((s) => {
          this.parcelas = s;
          for (let i of s) {
            this.total_parcelas = this.total_parcelas + i.valor;
          }
          if (this.dadosEditado.valor_total_principal <= this.total_parcelas){
            this.total_documento_alcancado = true; //
          } else {
            this.total_documento_alcancado = false;
          }
        })
        .catch((e) => {
          console.log(e);
          this.options.makeToast('danger', 'Ocorreu um erro!', e.error.message);
        });
    }
  }

  salvarDados() {
    if (this.formulario.value.documento === null || this.formulario.value.documento.trim() === '') {
      this.erro = true;
      this.mensagem_erro = 'Informe os dados necessários para continuar';
    } else {
      this.erro = false;
      this.mensagem_erro = '';
      this.options.insereDados(this.formulario.value);
    }
  }

  editarDados() {
    if (this.formulario.value.pk === null || String(this.formulario.value.pk).trim() === '') {
      this.erro = true;
      this.mensagem_erro = 'Informe os dados necessários para continuar';
      this.modalConfirmacao.close();
    } else {
      this.erro = false;
      this.mensagem_erro = '';
      this.options.alteraDados(this.formulario.value);
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
    this.options.excluirDadosParcela(formularioParcela);
    this.buscaParcelasDoDocumento(this.dadosEditado.pk);
    this.dialogReference.close();
  }

  editarDadosParcela(formularioParcela) {
    this.options.editarDadosParcela(formularioParcela, this.dadosEditado.pk);
    this.buscaParcelasDoDocumento(this.dadosEditado.pk);
    this.dialogReference.close();
  }

  salvarDadosParcela(formularioParcela) {
    this.options.salvarDadosParcela(formularioParcela, this.dadosEditado.pk);
    this.buscaParcelasDoDocumento(this.dadosEditado.pk);
    this.dialogReference.close();
  }

  confirmacaoExclusao(modal) {
    this.modalConfirmacao = this.modal.open(modal, { size: 'sm', backdrop: 'static' });
  }

  confirmacaoEdicao(modal) {
    this.modalConfirmacao = this.modal.open(modal, { size: 'sm', backdrop: 'static' });
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

  adicionarParcelas(modal) {
    this.novaParcela = true;
    this.dialogReference = this.dialogService.open(modal,
      {
        hasBackdrop: false,
        closeOnEsc: false,
      });
  }

  editarParcelas(modal, financeiro?) {
    this.novaParcela = false;
    this.dialogReference = this.dialogService.open(modal,
      {
        hasBackdrop: false,
        closeOnEsc: false,
      });
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
