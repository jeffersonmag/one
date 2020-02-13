import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  NbGlobalPosition, NbGlobalPhysicalPosition,
  NbComponentStatus, NbSearchService, NbToastrService, NbDialogService, NbDialogRef,
} from '@nebular/theme';
import { CadastrosApiService } from '../../../api/cadastros';

@Component({
  selector: 'ngx-lojas',
  templateUrl: './lojas.component.html',
  styleUrls: ['./lojas.component.scss'],
})
export class LojasComponent implements OnInit {

  modalReference: NgbModalRef;
  index = 1;
  destroyByClick = true;
  duration = 5000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = true;
  status: NbComponentStatus = 'success';
  titulo: string = 'Sucesso';
  mensagem: string = 'Ação realizada com sucesso!';
  pararSpinner: boolean = true;

  permissoes: any = JSON.parse(window.sessionStorage.permissao_acesso);
  permissaoDelete: boolean = this.permissoes.cadastro_loja.acl.D;
  permissaoInsert: boolean = this.permissoes.cadastro_loja.acl.I;
  permissaoSelect: boolean = this.permissoes.cadastro_loja.acl.S;
  permissaoUpdate: boolean = this.permissoes.cadastro_loja.acl.U;

  value = '';

  criacaoUsuario: boolean = false;
  edicaoUsuario: boolean = false;
  ativaBotaoPesquisa: boolean = false;

  dialogReference: NbDialogRef<any>;

  modoGrade: boolean = true; // Modo Grade = 0
  modoLista: boolean = false; // Modo Lista = 1

  dados = [];
  lojasEdicao = [];

  constructor(private campanhasApiService: CadastrosApiService,
    private searchService: NbSearchService,
    private dialogService: NbDialogService,
    private modalService: NgbModal,
    private toastrService: NbToastrService) {

    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.value = data.term;
        this.ativaBotaoPesquisa = true;
        this.buscaLojas(this.value);
      });

    this.buscaLojas('');
  }

  ngOnInit() {
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

  buscaLojas(valor?: string) {
    if (valor == '') {
      this.value = '';
      this.ativaBotaoPesquisa = false;
    }
    this.campanhasApiService.getLojas(
      {
        'pesquisa': valor,
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

  insereLojas(valor?) {
    this.campanhasApiService.postLojas(
      {
        'ativo': valor.ativo,
        'nome_fantasia': valor.nome_fantasia,
        'pn_codigo': valor.pn_codigo,
        'telefone1': valor.telefone1,
        'telefone2': valor.telefone2,
        'celular': valor.celular,
        'pessoa_de_contato': valor.pessoa_de_contato,
        'email_diretoria': valor.email_diretoria,
        'email_financeiro': valor.email_financeiro,
        'email_cadastro': valor.email_cadastro,
        'email_fisico': valor.email_fisico,
        'tipo_loja_pk': valor.tipo_loja_pk,
        'tipo_canal_venda_pk': valor.tipo_canal_venda_pk,
        'anotacao': valor.anotacao,
      },
    )
      .then((s) => {
        this.JoinAndClose();
        this.makeToast('success', 'Sucesso!', 'Lojas inserido com sucesso!');
        this.buscaLojas(this.value);
      })
      .catch((e) => {
        this.JoinAndClose();
        this.makeToast('danger', 'Ocorreu um erro!', e.error.message);
      });
  }

  alteraLojas(valor?) {
    this.campanhasApiService.putLojas(
      {
        'ativo': valor.ativo,
        'nome_fantasia': valor.nome_fantasia,
        'pn_codigo': valor.pn_codigo,
        'telefone1': valor.telefone1,
        'telefone2': valor.telefone2,
        'celular': valor.celular,
        'pessoa_de_contato': valor.pessoa_de_contato,
        'email_diretoria': valor.email_diretoria,
        'email_financeiro': valor.email_financeiro,
        'email_cadastro': valor.email_cadastro,
        'email_fisico': valor.email_fisico,
        'tipo_loja_pk': valor.tipo_loja_pk,
        'tipo_canal_venda_pk': valor.tipo_canal_venda_pk,
        'anotacao': valor.anotacao,
        'pk': valor.pk,
      },
    )
      .then((s) => {
        this.JoinAndClose();
        this.makeToast('success', 'Sucesso!', 'Dados do Lojas alterado com sucesso!');
        this.buscaLojas(this.value);
      })
      .catch((e) => {
        this.JoinAndClose();
        this.makeToast('danger', 'Erro!', e.error.message);
      });
  }

  excluirLojas(valor?) {
    this.campanhasApiService.delLojas(
      {
        'pk': valor.pk,
      },
    )
      .then((s) => {
        this.JoinAndClose();
        this.makeToast('success', 'Sucesso!', 'Loja excluído com sucesso!');
        this.buscaLojas(this.value);
      })
      .catch((e) => {
        this.JoinAndClose();
        this.makeToast('danger', 'Erro!', e.error.message);
      });
  }

  cadastrarNovoLojas(modal) {
    this.lojasEdicao = [];
    this.criacaoUsuario = true;
    this.edicaoUsuario = false;
    this.dialogReference = this.dialogService.open(modal,
      {
        hasBackdrop: false,
        closeOnEsc: false,
      });
  }

  editarLojas(modal, loja) {
    this.lojasEdicao = loja;
    this.edicaoUsuario = true;
    this.criacaoUsuario = false;
    this.dialogReference = this.dialogService.open(modal,
      {
        hasBackdrop: false,
        closeOnEsc: false,
      });
  }

  JoinAndClose() {
    this.dialogReference.close();
    this.lojasEdicao = [];
  }

  makeToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }
}
