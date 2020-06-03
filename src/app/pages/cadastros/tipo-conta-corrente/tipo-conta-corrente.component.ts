import { Component, OnInit } from '@angular/core';
import { NbComponentStatus, NbSearchService, NbDialogService, NbToastrService, NbDialogRef, NbGlobalPhysicalPosition, NbGlobalPosition } from '@nebular/theme';
import { CadastrosApiService } from '../../../api/cadastros';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-tipo-conta-corrente',
  templateUrl: './tipo-conta-corrente.component.html',
  styleUrls: ['./tipo-conta-corrente.component.scss']
})
export class TipoContaCorrenteComponent implements OnInit {

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

  novaTela = false;

  permissoes: any = JSON.parse(window.sessionStorage.permissao_acesso);
  permissaoDelete: boolean = this.permissoes.cadastro_tipo_conta_corrente.acl.D;
  permissaoInsert: boolean = this.permissoes.cadastro_tipo_conta_corrente.acl.I;
  permissaoSelect: boolean = this.permissoes.cadastro_tipo_conta_corrente.acl.S;
  permissaoUpdate: boolean = this.permissoes.cadastro_tipo_conta_corrente.acl.U;

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
        this.buscaTipoContaCorrente(this.value);
      });

    this.buscaTipoContaCorrente('');
  }

  ngOnInit() {
  }

  voltar(){
    this.novaTela = false;    
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

  buscaTipoContaCorrente(valor?: string) {
    if (valor == '') {
      this.value = '';
      this.ativaBotaoPesquisa = false;
    }
    this.campanhasApiService.getTipoContaCorrente(
      {
        "pesquisa": valor,
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

  insereTipoContaCorrente(valor?) {
    this.campanhasApiService.postTipoContaCorrente(
      {
        "codigo": valor.codigo,
        "nome": valor.nome,
      },
    )
      .then((s) => {
        this.JoinAndClose();
        this.makeToast('success', 'Sucesso!', 'Tipo Conta Corrente inserido com sucesso!');
        this.buscaTipoContaCorrente(this.value);
      })
      .catch((e) => {
        this.JoinAndClose();
        this.makeToast('danger', 'Ocorreu um erro!', e.error.message);
      });
  }

  alteraTipoContaCorrente(valor?) {
    this.campanhasApiService.putTipoContaCorrente(
      {
        "codigo": valor.codigo,
        "nome": valor.nome,
        "pk": valor.pk,
      },
    )
      .then((s) => {
        this.JoinAndClose();
        this.makeToast('success', 'Sucesso!', 'Dados do Tipo Conta Corrente alterado com sucesso!');
        this.buscaTipoContaCorrente(this.value);
      })
      .catch((e) => {
        this.JoinAndClose();
        this.makeToast('danger', 'Erro!', e.error.message);
      });
  }

  excluirTipoContaCorrente(valor?) {
    this.campanhasApiService.delTipoContaCorrente(
      {
        "pk": valor.pk,
      },
    )
      .then((s) => {
        this.JoinAndClose();
        this.makeToast('success', 'Sucesso!', 'Tipo Conta Corrente excluído com sucesso!');
        this.buscaTipoContaCorrente(this.value);
      })
      .catch((e) => {
        this.JoinAndClose();
        this.makeToast('danger', 'Erro!', e.error.message);
      });
  }

  cadastrarNovoTipoContaCorrente(modal) {
    this.usuarioEdicao = [];
    this.criacaoUsuario = true;
    this.edicaoUsuario = false;
    this.novaTela = true;
    /*this.dialogReference = this.dialogService.open(modal,
      {
        hasBackdrop: true,
        closeOnEsc: false,
        hasScroll: true,
      });*/
  }

  editarTipoContaCorrente(modal, usuario) {
    this.usuarioEdicao = usuario;
    this.edicaoUsuario = true;
    this.criacaoUsuario = false;
    this.novaTela = true;
    /*this.dialogReference = this.dialogService.open(modal,
      {
        hasBackdrop: true,
        closeOnEsc: false,
        hasScroll: true,
      });*/
  }

  JoinAndClose() {
    //this.dialogReference.close();
    this.novaTela = false;
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