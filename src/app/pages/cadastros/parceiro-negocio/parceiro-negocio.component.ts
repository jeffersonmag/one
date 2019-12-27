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

  formataDataPadraoBr(data) {
    var dd = data.getDate();
    var mm = data.getMonth() + 1;
    var yyyy = data.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }
    var dataFormatada = String(String(dd) + '/' + String(mm) + '/' + String(yyyy));
    return dataFormatada;
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
        this.dados = [];
        this.dados = s;
        var cnh_data_emissao = '';
        var cnh_data_vencimento = '';
        var data_nascimento_fundacao = '';
        var data_cadastro = '';
        var rg_data_emissao = '';
        var dadosParceiroNegocios = [];

        for (let i of s) {
          if (i.cnh_data_emissao !== null && i.cnh_data_emissao !== undefined) {
            cnh_data_emissao = i.cnh_data_emissao.substr(0, 10);
          }
          if (i.cnh_data_vencimento !== null && i.cnh_data_vencimento !== undefined) {
            cnh_data_vencimento = i.cnh_data_vencimento.substr(0, 10);
          }
          if (i.data_nascimento_fundacao !== null && i.data_nascimento_fundacao !== undefined) {
            data_nascimento_fundacao = i.data_nascimento_fundacao.substr(0, 10);
          }
          if (i.data_cadastro !== null && i.data_cadastro !== undefined) {
            data_cadastro = i.data_cadastro.substr(0, 10);
            data_cadastro = this.formataDataPadraoBr(data_cadastro);
          }
          if (i.rg_data_emissao !== null && i.rg_data_emissao !== undefined) {
            rg_data_emissao = i.rg_data_emissao.substr(0, 10);
          }
          dadosParceiroNegocios.push(
            {
              anotacoes: i.anotacoes,
              ativo: i.ativo,
              bairro: i.bairro,
              cargo: i.cargo,
              cep: i.cep,
              cidade: i.cidade,
              cnh: i.cnh,
              cnh_data_emissao: this.formataDataPadraoBr(cnh_data_emissao),
              cnh_data_vencimento: this.formataDataPadraoBr(cnh_data_vencimento),
              codigo_externo: i.codigo_externo,
              codigo_regime_tributario: i.codigo_regime_tributario,
              complmento: i.complmento,
              cpf_cnpj: i.cpf_cnpj,
              ctps: i.ctps,
              ctps_serie: i.ctps_serie,
              data_nascimento_fundacao: this.formataDataPadraoBr(data_nascimento_fundacao),
              data_cadastro: i.data_cadastro,
              email: i.email,
              empregador: i.empregador,
              endereco: i.endereco,
              estado_civil: i.estado_civil,
              genero: i.genero,
              inscricao_estadual: i.inscricao_estadual,
              inscricao_municipal: i.inscricao_municipal,
              matricula: i.matricula,
              naturalidade: i.naturalidade,
              nome: i.nome,
              nome_conjuge: i.nome_conjuge,
              nome_mae: i.nome_mae,
              nome_pai: i.nome_pai,
              numero: i.numero,
              pessoal_contato: i.pessoal_contato,
              plano_contas_pagar: i.plano_contas_pagar,
              plano_contas_receber: i.plano_contas_receber,
              pk: i.pk,
              razao_social: i.razao_social,
              reservista: i.reservista,
              rg: i.rg,
              rg_data_emissao: this.formataDataPadraoBr(rg_data_emissao),
              rg_orgao_emissor: i.rg_orgao_emissor,
              rg_uf_orgao_emissor: i.rg_uf_orgao_emissor,
              site: i.site,
              telefone: i.telefone,
              telefone2: i.telefone2,
              telefone_celular: i.telefone_celular,
              telefone_recado: i.telefone_recado,
              tipo_pessoa: i.tipo_pessoa,
              titulo_eleitor: i.titulo_eleitor,
              titulo_eleitor_sessao: i.titulo_eleitor_sessao,
              titulo_eleitor_zona: i.titulo_eleitor_zona,
              uf: i.uf,
            });
        }
        this.dados = dadosParceiroNegocios;
      })
      .catch((e) => {
        console.log(e);
        this.makeToast('danger', 'Ocorreu um erro!', e.error.message);
      });
  }

  formataData(data) {
    var dd = data.getDate() ;
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

  insereParceiroNegocios(valor?) {
    if (valor.cnh_data_emissao !== null && valor.cnh_data_emissao !== '' && valor.cnh_data_emissao !== undefined) {
      var cnh_data_emissao = this.formataData(valor.cnh_data_emissao);
    }
    if (valor.cnh_data_vencimento !== null && valor.cnh_data_vencimento !== '' && valor.cnh_data_vencimento !== undefined) {
      var cnh_data_vencimento = this.formataData(valor.cnh_data_vencimento);
    }
    if (valor.data_nascimento_fundacao !== null && valor.data_nascimento_fundacao !== '' && valor.data_nascimento_fundacao !== undefined) {
      var data_nascimento_fundacao = this.formataData(valor.data_nascimento_fundacao);
    }
    if (valor.rg_data_emissao !== null && valor.rg_data_emissao !== '' && valor.rg_data_emissao !== undefined) {
      var rg_data_emissao = this.formataData(valor.rg_data_emissao);
    }
    this.campanhasApiService.postParceiroNegocios(
      {
        'anotacoes': valor.anotacoes,
        'ativo': valor.ativo,
        'bairro': valor.bairro,
        'cargo': valor.cargo,
        'cep': valor.cep,
        'cidade': valor.cidade,
        'cnh': valor.cnh,
        'cnh_data_emissao': cnh_data_emissao,
        'cnh_data_vencimento': cnh_data_vencimento,
        'codigo_externo': valor.codigo_externo,
        'codigo_regime_tributario': valor.codigo_regime_tributario,
        'complmento': valor.complmento,
        'cpf_cnpj': valor.cpf_cnpj,
        'ctps': valor.ctps,
        'ctps_serie': valor.ctps_serie,
        'data_nascimento_fundacao': data_nascimento_fundacao,
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
        'plano_contas_pagar': valor.plano_contas_pagar,
        'plano_contas_receber': valor.plano_contas_receber,
        'razao_social': valor.razao_social,
        'reservista': valor.reservista,
        'rg': valor.rg,
        'rg_data_emissao': rg_data_emissao,
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
      });
  }

  alteraParceiroNegocios(valor?) {
    if (valor.cnh_data_emissao !== null && valor.cnh_data_emissao !== "") {
      var cnh_data_emissao = this.formataData(new Date(valor.cnh_data_emissao));
    } else {
      cnh_data_emissao = null;
    }

    if (valor.cnh_data_vencimento !== null && valor.cnh_data_vencimento !== "") {
      var cnh_data_vencimento = this.formataData(new Date(valor.cnh_data_vencimento));
    } else {
      cnh_data_vencimento = null;
    }
    if (valor.data_nascimento_fundacao !== null && valor.data_nascimento_fundacao !== "") {
      var data_nascimento_fundacao = this.formataData(new Date(valor.data_nascimento_fundacao));
    } else {
      data_nascimento_fundacao = null;
    }
    if (valor.rg_data_emissao !== null && valor.rg_data_emissao !== "") {
      var rg_data_emissao = this.formataData(new Date(valor.rg_data_emissao));
    } else {
      rg_data_emissao = null;
    }
    this.campanhasApiService.putParceiroNegocios(
      {
        'anotacoes': valor.anotacoes,
        'ativo': valor.ativo,
        'bairro': valor.bairro,
        'cargo': valor.cargo,
        'cep': valor.cep,
        'cidade': valor.cidade,
        'cnh': valor.cnh,
        'cnh_data_emissao': cnh_data_emissao,
        'cnh_data_vencimento': cnh_data_vencimento,
        'codigo_externo': valor.codigo_externo,
        'codigo_regime_tributario': valor.codigo_regime_tributario,
        'complmento': valor.complmento,
        'cpf_cnpj': valor.cpf_cnpj,
        'ctps': valor.ctps,
        'ctps_serie': valor.ctps_serie,
        'data_nascimento_fundacao': data_nascimento_fundacao,
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
        'plano_contas_pagar': valor.plano_contas_pagar,
        'plano_contas_receber': valor.plano_contas_receber,
        'razao_social': valor.razao_social,
        'reservista': valor.reservista,
        'rg': valor.rg,
        'rg_data_emissao': rg_data_emissao,
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
        this.makeToast('success', 'Sucesso!', 'Dados do Cliente alterado com sucesso!');
        this.buscaParceiroNegocios(this.value);
      })
      .catch((e) => {
        this.makeToast('danger', 'Erro!', e.error.message);
      });
  }

  excluirParceiroNegocios(valor?) {
    this.campanhasApiService.delParceiroNegocios(
      {
        'cpf_cnpj': valor.cpf_cnpj,
      },
    )
      .then((s) => {
        this.JoinAndClose();
        this.makeToast('success', 'Sucesso!', 'Dados do Cliente excluídos com sucesso!');
        this.buscaParceiroNegocios(this.value);
      })
      .catch((e) => {
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
        closeOnEsc: false,
      });
  }

  editarParceiroNegocios(modal, usuario) {
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
