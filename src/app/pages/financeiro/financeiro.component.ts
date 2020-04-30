import { Component, OnInit, OnDestroy, destroyPlatform } from '@angular/core';
import { FinanceiroApiService } from '../../api/financeiro';
import {
  NbComponentStatus, NbGlobalPhysicalPosition,
  NbToastrService, NbDialogRef, NbDialogService, NbSidebarService,
} from '@nebular/theme';

@Component({
  selector: 'ngx-financeiro',
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.scss']
})
export class FinanceiroComponent implements OnInit, OnDestroy {

  public filtros = [{
    nome: 'Fornecedor',
    parametro: 'filtro_fornecedor',
  }, {
    nome: 'Conta Caixa',
    parametro: 'filtro_conta_caixa',
  }, {
    nome: 'Emissor Documento',
    parametro: 'filtro_emissor_documento',
  },
  {
    nome: 'Data Emissão',
    parametro: 'filtro_emissao',
  },
  {
    nome: 'Data Vencimento',
    parametro: 'filtro_vencimento',
  }];
  public selectedFiltro: string;
  public dadosFiltro: string;

  permissoes: any = JSON.parse(window.sessionStorage.permissao_acesso);
  permissaoDelete: boolean = this.permissoes.manutencao_financeiro.acl.D;
  permissaoInsert: boolean = this.permissoes.manutencao_financeiro.acl.I;
  permissaoSelect: boolean = this.permissoes.manutencao_financeiro.acl.S;
  permissaoUpdate: boolean = this.permissoes.manutencao_financeiro.acl.U;

  modoGrade: boolean = true;
  modoLista: boolean = false;

  exibirToggle = false;

  value = '';

  habilitaBotaoSalvar: boolean = true;

  criacaoFinanceiroDocumento: boolean = false;
  edicaoFinanceiroDocumento: boolean = false;

  edicaoFinanceiroParcela: boolean = this.permissoes.manutencao_financeiro.acl.U;
  criacaoFinanceiroParcela: boolean = this.permissoes.manutencao_financeiro.acl.I;
  exclusaoFinanceiroParcela: boolean = this.permissoes.manutencao_financeiro.acl.D;

  ativaBotaoPesquisa: boolean = false;

  dialogReference: NbDialogRef<any>;

  dados = [];
  parcela = [];
  dadosFinanceiroDocumento = [];


  constructor(private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private FinanceiroApiService: FinanceiroApiService,
    private sidebarService: NbSidebarService) {
    this.buscaDados('');
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.dialogReference !== undefined) {
      this.dialogReference.close();
    }
  }

  toggleCompact() {
    this.sidebarService.toggle(false);
    this.exibirToggle = !this.exibirToggle;
  }

  modoExibicao(modo) {
    if (modo === 0) { // Modo Grade = 0
      this.modoGrade = true;
      this.modoLista = false;
    }
    if (modo === 1) { // Modo Lista = 1
      this.modoGrade = false;
      this.modoLista = true;
    }
  }

  buscaDados(valor?: string) {
    if (valor === '') {
      this.value = '';
      this.ativaBotaoPesquisa = false;
    } else {
      if (this.selectedFiltro !== '' && this.selectedFiltro !== undefined) {
        this.value = valor;
        this.ativaBotaoPesquisa = true;
        valor = this.selectedFiltro + '=' + valor;
      }
    }
    this.FinanceiroApiService.getDocumentoFinanceiro(
      {
        'pesquisa': valor,
        'filtrar': this.ativaBotaoPesquisa,
      },
    )
      .then((s) => {
        this.dados = s;
      })
      .catch((e) => {
        console.log(e);
        this.makeToast('danger', 'Ocorreu um erro!', e.error.message);
      });
  }

  buscaDadosParcela(valor?: string): any {
    if (valor === '') {
      this.value = '';
      this.ativaBotaoPesquisa = false;
    }
    this.FinanceiroApiService.getParcelaFinanceiro(
      {
        'financeiro_documento_pk': valor,
      },
    )
      .then((s) => {
        return this.parcela = s;
      })
      .catch((e) => {
        console.log(e);
        this.makeToast('danger', 'Ocorreu um erro!', e.error.message);
      });
  }

  formataData(data) {
    var dd = data.getDate();
    var mm = data.getMonth() + 1;
    var yyyy = data.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }
    var dataFormatada = String(String(yyyy) + '-' + String(mm) + '-' + String(dd));
    return dataFormatada;
  }


  alteraDados(valor?) {
    if (valor.data_emissao !== null && valor.data_emissao !== '' && valor.data_emissao !== undefined) {
      var data_emissao = this.formataData(valor.data_emissao);
    } else {
      data_emissao = null;
    }
    if (valor.competencia !== null && valor.competencia !== '' && valor.competencia !== undefined) {
      var competencia = this.formataData(valor.competencia);
    } else {
      competencia = null;
    }
    this.FinanceiroApiService.putDocumentoFinanceiro(
      {
        'competencia': competencia,
        'data_emissao': data_emissao,
        'descricao': valor.descricao,
        'documento': valor.documento,
        'pn_pk_emissor_documento': valor.pn_pk_emissor_documento,
        'projetos_nome': valor.projetos_nome,
        'projetos_pk': valor.projetos_pk,
        'tipo': 'P',
        'tipo_documentos_financeiro_pk': valor.tipo_documentos_financeiro_pk,
        'valor_total_principal': valor.valor_total_principal,
        'pk': valor.pk,
      },
    )
      .then((s) => {
        //this.JoinAndClose();
        this.makeToast('success', 'Sucesso!', 'Dados alterados com sucesso!');
        this.buscaDados(this.value);
      })
      .catch((e) => {
        //this.JoinAndClose();
        this.makeToast('danger', 'Erro!', e.error.message);
      });
  }

  excluirDados(valor?) {
    this.FinanceiroApiService.delDocumentoFinanceiro(
      {
        'pk': valor.pk,
      },
    )
      .then((s) => {
        this.JoinAndClose();
        this.makeToast('success', 'Sucesso!', 'Dados excluído com sucesso!');
        this.buscaDados(this.value);
      })
      .catch((e) => {
        this.JoinAndClose();
        this.makeToast('danger', 'Erro!', e.error.message);
      });
  }

  salvarDadosParcela(valor?, pk_documento?): any {
    if (valor.data_vencimento !== null && valor.data_vencimento !== '' && valor.data_vencimento !== undefined) {
      var data_vencimento = this.formataData(valor.data_vencimento);
    } else {
      data_vencimento = null;
    }
    this.FinanceiroApiService.postParcelaFinanceiro(
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
        //this.JoinAndClose();
        this.makeToast('success', 'Sucesso!', 'Dados incluídos com sucesso!');
        this.buscaDados(this.value);
        this.parcela = this.buscaDadosParcela(String(pk_documento));
        return this.parcela;
      })
      .catch((e) => {
        //this.JoinAndClose();
        this.makeToast('danger', 'Erro!', e.error.message);
      });
  }

  cadastrarNovoFinanceiro(modal) {
    this.dadosFinanceiroDocumento = [];
    this.criacaoFinanceiroDocumento = true;
    this.edicaoFinanceiroDocumento = false;
    this.dialogReference = this.dialogService.open(modal,
      {
        hasBackdrop: false,
        closeOnEsc: false,
        hasScroll: true,
        backdropClass: 'light-black-backdrop',
      });
  }

  editarFinanceiro(modal, financeiro) {
    this.dadosFinanceiroDocumento = financeiro;
    this.edicaoFinanceiroDocumento = true;
    this.criacaoFinanceiroDocumento = false;
    this.dialogReference = this.dialogService.open(modal,
      {
        hasBackdrop: false,
        closeOnEsc: false,
        hasScroll: true,
        backdropClass: 'light-black-backdrop',
      });
  }

  JoinAndClose() {
    this.dialogReference.close();
    this.dadosFinanceiroDocumento = [];
  }

  makeToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 10000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: true,
    };
    const titleContent = title ? `${title}` : '';

    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }

}
