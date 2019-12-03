import { Component, OnInit } from '@angular/core';
import { CadastrosApiService } from '../../../api/cadastros';
import {
  NbSearchService, NbToastrService, NbGlobalPosition,
  NbGlobalPhysicalPosition, NbComponentStatus,
} from '@nebular/theme';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-parceiro-negocio',
  templateUrl: './parceiro-negocio.component.html',
  styleUrls: ['./parceiro-negocio.component.scss'],
})
export class ParceiroNegocioComponent implements OnInit {

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
  permissaoDelete: boolean = this.permissoes.cadastro_pn.acl.D;
  permissaoInsert: boolean = this.permissoes.cadastro_pn.acl.I;
  permissaoSelect: boolean = this.permissoes.cadastro_pn.acl.S;
  permissaoUpdate: boolean = this.permissoes.cadastro_pn.acl.U;

  value = '';

  criacaoUsuario: boolean = false;
  edicaoUsuario: boolean = false;
  ativaBotaoPesquisa: boolean = false;

  modoGrade: boolean = true; // Modo Grade = 0
  modoLista: boolean = false; // Modo Lista = 1

  dados = [];
  usuarioEdicao = [];

  constructor(private campanhasApiService: CadastrosApiService,
    private searchService: NbSearchService,
    private modalService: NgbModal,
    private toastrService: NbToastrService) {

    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.value = data.term;
        this.ativaBotaoPesquisa = true;
        this.buscaUsuarios(this.value);
      });

    this.buscaUsuarios('');
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

  buscaUsuarios(valor?: string) {
    if (valor === '') {
      this.value = '';
      this.ativaBotaoPesquisa = false;
    }
    this.campanhasApiService.getParceiroNegocios(
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

  insereUsuarios(valor?) {
    this.campanhasApiService.postParceiroNegocios(
      {
        "cpf": valor.cpf,
        "nome": valor.nome,
      },
    )
      .then((s) => {
        this.JoinAndClose();
        this.makeToast('success', 'Sucesso!', 'Cliente inserido com sucesso!');
        this.buscaUsuarios(this.value);
      })
      .catch((e) => {
        this.JoinAndClose();
        this.makeToast('danger', 'Ocorreu um erro!', e.error.message);
      });
  }

  alteraUsuarios(valor?) {
    this.campanhasApiService.putParceiroNegocios(
      {
        "cpf": valor.cpf,
        "nome": valor.nome,
      },
    )
      .then((s) => {
        this.JoinAndClose();
        this.makeToast('success', 'Sucesso!', 'Dados do Cliente alterado com sucesso!');
        this.buscaUsuarios(this.value);
      })
      .catch((e) => {
        this.JoinAndClose();
        this.makeToast('danger', 'Erro!', e.error.message);
      });
  }

  excluirUsuarios(valor?) {
    this.campanhasApiService.delParceiroNegocios(
      {
        "cpf": valor.cpf,
      },
    )
      .then((s) => {
        this.JoinAndClose();
        this.makeToast('success', 'Sucesso!', 'Dados do Cliente excluídos com sucesso!');
        this.buscaUsuarios(this.value);
      })
      .catch((e) => {
        this.JoinAndClose();
        this.makeToast('danger', 'Erro!', e.error.message);
      });
  }

  cadastrarNovoUsuario(modal) {
    this.usuarioEdicao = [];
    this.criacaoUsuario = true;
    this.edicaoUsuario = false;
    this.modalReference = this.modalService.open(modal, { size: 'xl', backdrop: 'static' });
  }

  editarUsuario(modal, usuario) {
    this.usuarioEdicao = usuario;
    this.edicaoUsuario = true;
    this.criacaoUsuario = false;
    this.modalReference = this.modalService.open(modal, { size: 'xl', backdrop: 'static' });
  }

  JoinAndClose() {
    this.modalReference.close();
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
