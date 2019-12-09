import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CadastrosApiService } from '../../../api/cadastros';
import {
  NbSearchService, NbToastrService, NbGlobalPosition,
  NbGlobalPhysicalPosition, NbComponentStatus, NbWindowService, NbWindowRef, NbDialogService, NbDialogRef,
} from '@nebular/theme';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalWindow } from '@ng-bootstrap/ng-bootstrap/modal/modal-window';

@Component({
  selector: 'ngx-parceiro-negocio',
  templateUrl: './parceiro-negocio.component.html',
  styleUrls: ['./parceiro-negocio.component.scss'],
})
export class ParceiroNegocioComponent implements OnInit {

  @ViewChild('contentWindow', { static: true }) contentTemplateWindow: TemplateRef<any>;

  modalReference: NgbModalRef;
  windowReference: NbWindowRef;
  dialogReference: NbDialogRef<any>;

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
    private windowService: NbWindowService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService) {

    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.value = data.term;
        this.ativaBotaoPesquisa = true;
        this.buscaParceiroNegocios(this.value);
      });

    this.buscaParceiroNegocios('');
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

  buscaParceiroNegocios(valor?: string) {
    if (valor === '') {
      this.value = '';
      this.ativaBotaoPesquisa = false;
    }
    this.campanhasApiService.getParceiroNegocios(
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

  insereParceiroNegocios(valor?) {
    this.campanhasApiService.postParceiroNegocios(
      {
        'anotacoes': valor.anotacoes,
        'ativo': valor.ativo,
        'bairro': valor.bairro,
        'cargo': valor.cargo,
        'cep': valor.cep,
        'cidade': valor.cidade,
        'cnh': valor.cnh,
        'cnh_data_emissao': valor.cnh_data_emissao,
        'cnh_data_vencimento': valor.cnh_data_vencimento,
        'codigo_externo': valor.codigo_externo,
        'codigo_regime_tributario': valor.codigo_regime_tributario,
        'complmento': valor.complmento,
        'cpf_cnpj': valor.cpf_cnpj,
        'ctps': valor.ctps,
        'ctps_serie': valor.ctps_serie,
        'data_cadastro': valor.data_cadastro,
        'data_nascimento_fundacao': valor.data_nascimento_fundacao,
        'email': valor.email,
        'empregador': valor.empregador,
        'endereco': valor.endereco,
        'estado_civil': valor.estado_civil,
        'genero': valor.genero,
        'inscricao_estadual': valor.inscricao_estadual,
        'inscricao_municipal': valor.inscricao_municipal,
        'matricula': valor.matricula,
        'naturalidade': valor.naturalidade,
        'nome': valor.nome,
        'nome_conjuge': valor.nome_conjuge,
        'nome_mae': valor.nome_mae,
        'nome_pai': valor.nome_pai,
        'numero': valor.numero,
        'pessoal_contato': valor.pessoal_contato,
        'pk': valor.pk,
        'plano_contas_pagar': valor.plano_contas_pagar,
        'plano_contas_receber': valor.plano_contas_receber,
        'razao_social': valor.razao_social,
        'reservista': valor.reservista,
        'rg': valor.rg,
        'rg_data_emissao': valor.rg_data_emissao,
        'rg_orgao_emissor': valor.rg_orgao_emissor,
        'rg_uf_orgao_emissor': valor.rg_uf_orgao_emissor,
        'site': valor.site,
        'telefone': valor.telefone,
        'telefone2': valor.telefone2,
        'telefone_celular': valor.telefone_celular,
        'telefone_recado': valor.telefone_recado,
        'tipo_pessoa': valor.tipo_pessoa,
        'titulo_eleitor': valor.titulo_eleitor,
        'titulo_eleitor_sessao': valor.titulo_eleitor_sessao,
        'titulo_eleitor_zona': valor.titulo_eleitor_zona,
        'uf': valor.uf,
      },
    )
      .then((s) => {
        this.JoinAndClose();
        this.makeToast('success', 'Sucesso!', 'Cliente inserido com sucesso!');
        this.buscaParceiroNegocios(this.value);
      })
      .catch((e) => {
        this.makeToast('danger', 'Ocorreu um erro!', e.error.message);
        this.JoinAndClose();
      });
  }

  alteraParceiroNegocios(valor?) {
    this.campanhasApiService.putParceiroNegocios(
      {
        'cpf': valor.cpf,
        'nome': valor.nome,
      },
    )
      .then((s) => {
        this.JoinAndClose();
        this.makeToast('success', 'Sucesso!', 'Dados do Cliente alterado com sucesso!');
        this.buscaParceiroNegocios(this.value);
      })
      .catch((e) => {
        this.JoinAndClose();
        this.makeToast('danger', 'Erro!', e.error.message);
      });
  }

  excluirParceiroNegocios(valor?) {
    this.campanhasApiService.delParceiroNegocios(
      {
        'cpf': valor.cpf,
      },
    )
      .then((s) => {
        this.JoinAndClose();
        this.makeToast('success', 'Sucesso!', 'Dados do Cliente excluídos com sucesso!');
        this.buscaParceiroNegocios(this.value);
      })
      .catch((e) => {
        this.JoinAndClose();
        this.makeToast('danger', 'Erro!', e.error.message);
      });
  }

  cadastrarNovoParceiroNegocios(modal) {
    this.usuarioEdicao = [];
    this.criacaoUsuario = true;
    this.edicaoUsuario = false;
    this.dialogReference = this.dialogService.open(modal,
      {
        hasBackdrop: false,
      });
  }

  editarParceiroNegocios(modal, usuario) {
    this.usuarioEdicao = usuario;
    this.edicaoUsuario = true;
    this.criacaoUsuario = false;
    this.dialogReference = this.dialogService.open(modal,
      {
        hasBackdrop: false,
      });
  }

  JoinAndClose() {
    this.windowReference.close();
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
