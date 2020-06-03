import { Component, OnInit } from '@angular/core';
import {
  NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbDialogRef,
  NbSearchService, NbDialogService, NbToastrService,
} from '@nebular/theme';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CadastrosApiService } from '../../../api/cadastros';

@Component({
  selector: 'ngx-centro-custos',
  templateUrl: './centro-custos.component.html',
  styleUrls: ['./centro-custos.component.scss']
})
export class CentroCustosComponent implements OnInit {

  novaTela = false;

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
  permissaoDelete: boolean = this.permissoes.cadastro_centro_de_custos.acl.D;
  permissaoInsert: boolean = this.permissoes.cadastro_centro_de_custos.acl.I;
  permissaoSelect: boolean = this.permissoes.cadastro_centro_de_custos.acl.S;
  permissaoUpdate: boolean = this.permissoes.cadastro_centro_de_custos.acl.U;

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
        this.buscaCentroCustos(this.value);
      });

    this.buscaCentroCustos('');
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

  buscaCentroCustos(valor?: string) {
    if (valor === '') {
      this.value = '';
      this.ativaBotaoPesquisa = false;
    }
    this.campanhasApiService.getCentroCustos(
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

  insereCentroCustos(valor?) {
    this.campanhasApiService.postCentroCustos(
      {
        "classificacao": valor.classificacao,
        "nome": valor.nome,
      },
    )
      .then((s) => {
        this.JoinAndClose();
        this.makeToast('success', 'Sucesso!', 'Centro de custos inserido com sucesso!');
        this.buscaCentroCustos(this.value);
      })
      .catch((e) => {
        this.JoinAndClose();
        this.makeToast('danger', 'Ocorreu um erro!', e.error.message);
      });
  }

  alteraCentroCustos(valor?) {
    this.campanhasApiService.putCentroCustos(
      {
        "classificacao": valor.codigo,
        "nome": valor.nome,
        "pk": valor.pk,
      },
    )
      .then((s) => {
        this.JoinAndClose();
        this.makeToast('success', 'Sucesso!', 'Dados do centro de custos alterado com sucesso!');
        this.buscaCentroCustos(this.value);
      })
      .catch((e) => {
        this.JoinAndClose();
        this.makeToast('danger', 'Erro!', e.error.message);
      });
  }

  excluirCentroCustos(valor?) {
    this.campanhasApiService.delCentroCustos(
      {
        "pk": valor.pk,
      },
    )
      .then((s) => {
        this.JoinAndClose();
        this.makeToast('success', 'Sucesso!', 'Centro de custos excluído com sucesso!');
        this.buscaCentroCustos(this.value);
      })
      .catch((e) => {
        this.JoinAndClose();
        this.makeToast('danger', 'Erro!', e.error.message);
      });
  }

  cadastrarNovoCentroCustos(modal) {
    this.usuarioEdicao = [];
    this.novaTela = true;
    this.criacaoUsuario = true;
    this.edicaoUsuario = false;
    /*this.dialogReference = this.dialogService.open(modal,
      {
        hasBackdrop: true,
        closeOnEsc: false,
        hasScroll: true,
      });*/
  }

  editarCentroCustos(modal, usuario) {
    this.usuarioEdicao = usuario;
    this.novaTela = true;
    this.edicaoUsuario = true;
    this.criacaoUsuario = false;
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
