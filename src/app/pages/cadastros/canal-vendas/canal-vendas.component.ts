import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  NbGlobalPosition, NbGlobalPhysicalPosition,
  NbComponentStatus, NbSearchService, NbToastrService, NbDialogService, NbDialogRef,
} from '@nebular/theme';
import { CadastrosApiService } from '../../../api/cadastros';

@Component({
  selector: 'ngx-canal-Vendas',
  templateUrl: './canal-vendas.component.html',
  styleUrls: ['./canal-vendas.component.scss'],
})
export class CanalVendasComponent implements OnInit {

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
  permissaoDelete: boolean = this.permissoes.cadastro_tipo_canal_venda.acl.D;
  permissaoInsert: boolean = this.permissoes.cadastro_tipo_canal_venda.acl.I;
  permissaoSelect: boolean = this.permissoes.cadastro_tipo_canal_venda.acl.S;
  permissaoUpdate: boolean = this.permissoes.cadastro_tipo_canal_venda.acl.U;

  value = '';

  criacaoUsuario: boolean = false;
  edicaoUsuario: boolean = false;
  ativaBotaoPesquisa: boolean = false;

  dialogReference: NbDialogRef<any>;

  modoGrade: boolean = true; // Modo Grade = 0
  modoLista: boolean = false; // Modo Lista = 1

  dados = [];
  usuarioEdicao = [];

  constructor(private campanhasApiService: CadastrosApiService,
    private searchService: NbSearchService,
    private dialogService: NbDialogService,
    private modalService: NgbModal,
    private toastrService: NbToastrService) {

    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.value = data.term;
        this.ativaBotaoPesquisa = true;
        this.buscaCanalVendas(this.value);
      });

    this.buscaCanalVendas('');
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

  buscaCanalVendas(valor?: string) {
    if (valor === '') {
      this.value = '';
      this.ativaBotaoPesquisa = false;
    }
    this.campanhasApiService.getTipoCanalVendas(
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

  insereCanalVendas(valor?) {
    this.campanhasApiService.postTipoCanalVendas(
      {
        'nome': valor.nome,
      },
    )
      .then((s) => {
        this.JoinAndClose();
        this.makeToast('success', 'Sucesso!', 'Canal de Vendas inserido com sucesso!');
        this.buscaCanalVendas(this.value);
      })
      .catch((e) => {
        this.JoinAndClose();
        this.makeToast('danger', 'Ocorreu um erro!', e.error.message);
      });
  }

  alteraCanalVendas(valor?) {
    this.campanhasApiService.putTipoCanalVendas(
      {
        'nome': valor.nome,
        'pk': valor.pk,
      },
    )
      .then((s) => {
        this.JoinAndClose();
        this.makeToast('success', 'Sucesso!', 'Dados do Canal de Vendas alterado com sucesso!');
        this.buscaCanalVendas(this.value);
      })
      .catch((e) => {
        this.JoinAndClose();
        this.makeToast('danger', 'Erro!', e.error.message);
      });
  }

  excluirCanalVendas(valor?) {
    this.campanhasApiService.delTipoCanalVendas(
      {
        'pk': valor.pk,
      },
    )
      .then((s) => {
        this.JoinAndClose();
        this.makeToast('success', 'Sucesso!', 'Canal de Vendas excluído com sucesso!');
        this.buscaCanalVendas(this.value);
      })
      .catch((e) => {
        this.JoinAndClose();
        this.makeToast('danger', 'Erro!', e.error.message);
      });
  }

  cadastrarNovoCanalVendas(modal) {
    this.usuarioEdicao = [];
    this.criacaoUsuario = true;
    this.edicaoUsuario = false;
    this.dialogReference = this.dialogService.open(modal,
      {
        hasBackdrop: false,
        closeOnEsc: false,
      });
  }

  editarCanalVendas(modal, usuario) {
    this.usuarioEdicao = usuario;
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
    this.usuarioEdicao = [];
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
