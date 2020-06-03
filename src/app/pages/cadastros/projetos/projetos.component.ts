import { Component, OnInit } from '@angular/core';
import {
  NbComponentStatus, NbDialogRef, NbSearchService, NbDialogService, NbToastrService,
  NbGlobalPhysicalPosition, NbGlobalPosition,
} from '@nebular/theme';
import { CadastrosApiService } from '../../../api/cadastros';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss']
})
export class ProjetosComponent implements OnInit {

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
  permissaoDelete: boolean = this.permissoes.cadastro_projetos.acl.D;
  permissaoInsert: boolean = this.permissoes.cadastro_projetos.acl.I;
  permissaoSelect: boolean = this.permissoes.cadastro_projetos.acl.S;
  permissaoUpdate: boolean = this.permissoes.cadastro_projetos.acl.U;

  value = '';

  novaTela = false;

  criacaoUsuario: boolean = false;
  edicaoUsuario: boolean = false;
  ativaBotaoPesquisa: boolean = false;

  dialogReference: NbDialogRef<any>;

  modoGrade: boolean = true; // Modo Grade = 0
  modoLista: boolean = false; // Modo Lista = 1

  dados = [];
  dadosEdicao = [];

  constructor(private campanhasApiService: CadastrosApiService,
    private searchService: NbSearchService,
    private dialogService: NbDialogService,
    private modalService: NgbModal,
    private toastrService: NbToastrService) {

    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.value = data.term;
        this.ativaBotaoPesquisa = true;
        this.buscaProjetos(this.value);
      });

    this.buscaProjetos('');
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

  buscaProjetos(valor?: string) {
    if (valor == '') {
      this.value = '';
      this.ativaBotaoPesquisa = false;
    }
    this.campanhasApiService.getProjetos(
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

  insereProjetos(valor?) {
    if (valor.vigencia_de !== null && valor.vigencia_de !== '') {
      var vigencia_de = this.formataData(valor.vigencia_de);
    }
    if (valor.vigencia_ate !== null && valor.vigencia_ate !== '') {
      var vigencia_ate = this.formataData(valor.vigencia_ate);
    }
    this.campanhasApiService.postProjetos(
      {
        "vigencia_de": vigencia_de,
        "vigencia_ate": vigencia_ate,
        "nome": valor.nome,
      },
    )
      .then((s) => {
        this.JoinAndClose();
        this.makeToast('success', 'Sucesso!', 'Projetos inserido com sucesso!');
        this.buscaProjetos(this.value);
      })
      .catch((e) => {
        this.JoinAndClose();
        this.makeToast('danger', 'Ocorreu um erro!', e.error.message);
      });
  }

  alteraProjetos(valor?) {
    this.campanhasApiService.putProjetos(
      {
        "vigencia_de": valor.vigencia_de,
        "vigencia_ate": valor.vigencia_ate,
        "nome": valor.nome,
        "pk": valor.pk,
      },
    )
      .then((s) => {
        this.JoinAndClose();
        this.makeToast('success', 'Sucesso!', 'Dados do Projetos alterado com sucesso!');
        this.buscaProjetos(this.value);
      })
      .catch((e) => {
        this.JoinAndClose();
        this.makeToast('danger', 'Erro!', e.error.message);
      });
  }

  excluirProjetos(valor?) {
    this.campanhasApiService.delProjetos(
      {
        "pk": valor.pk,
      },
    )
      .then((s) => {
        this.JoinAndClose();
        this.makeToast('success', 'Sucesso!', 'Projetos excluído com sucesso!');
        this.buscaProjetos(this.value);
      })
      .catch((e) => {
        this.JoinAndClose();
        this.makeToast('danger', 'Erro!', e.error.message);
      });
  }

  cadastrarNovoProjetos(modal) {
    this.dadosEdicao = [];
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

  voltar(){
    this.novaTela = false;    
  }

  editarProjetos(modal, usuario) {
    this.dadosEdicao = usuario;
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
    this.dadosEdicao = [];
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
