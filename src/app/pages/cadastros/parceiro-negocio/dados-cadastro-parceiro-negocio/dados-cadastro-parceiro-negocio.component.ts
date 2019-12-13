import { Component, OnInit, OnDestroy } from '@angular/core';
import { ParceiroNegocioComponent } from '../parceiro-negocio.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../../validation.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NbDateService } from '@nebular/theme';

@Component({
  selector: 'dados-cadastro-parceiro-negocio',
  templateUrl: './dados-cadastro-parceiro-negocio.component.html',
  styleUrls: ['./dados-cadastro-parceiro-negocio.scss']
})
export class DadosCadastroParceiroNegocioComponent implements OnInit, OnDestroy {

  usuarioEditado: any;
  edicaoUsuario: boolean;
  criacaoUsuario: boolean;
  permissaoExclusao: boolean;
  formulario: FormGroup;
  selectedOption;
  erro: boolean = false;
  mensagem_erro: string = '';
  modalConfirmacao: NgbModalRef;

  estados = [
    'AC', 'AL', 'AP', 'AM', 'BA',
    'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB',
    'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP',
    'SE', 'TO'];
  max: Date;

  constructor(private options: ParceiroNegocioComponent,
    private modal: NgbModal,
    private formBuilder: FormBuilder,
    protected dateService: NbDateService<Date>) {
    this.max = this.dateService.addDay(this.dateService.today(), 0);
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
    //var dataFormadata = String(String(yyyy) + '-' + String(mm) + '-' + String(dd));
    var dataFormatada = String(String(dd) + '/' + String(mm) + '/' + String(yyyy));
    return dataFormatada;
  }

  ngOnInit() {
    this.usuarioEditado = [];
    this.edicaoUsuario = this.options.edicaoUsuario;
    this.criacaoUsuario = this.options.criacaoUsuario;
    this.permissaoExclusao = this.options.permissaoDelete;

    var cnh_data_emissao = '';
    var cnh_data_vencimento = '';
    var data_nascimento_fundacao = '';
    var data_cadastro = '';
    var rg_data_emissao = '';


    if (this.options.usuarioEdicao.length !== 0) {
      this.usuarioEditado = this.options.usuarioEdicao;

      if (this.usuarioEditado.cnh_data_emissao !== null) {
        cnh_data_emissao = this.usuarioEditado.cnh_data_emissao.substr(0, 10);
      }
      if (this.usuarioEditado.cnh_data_vencimento !== null) {
        cnh_data_vencimento = this.usuarioEditado.cnh_data_vencimento.substr(0, 10);
      }
      if (this.usuarioEditado.data_nascimento_fundacao !== null) {
        data_nascimento_fundacao = this.usuarioEditado.data_nascimento_fundacao.substr(0, 10);
      }
      if (this.usuarioEditado.data_cadastro !== null) {
        data_cadastro = this.usuarioEditado.data_cadastro.substr(0, 10);
      }
      if (this.usuarioEditado.rg_data_emissao !== null) {
        rg_data_emissao = this.usuarioEditado.rg_data_emissao.substr(0, 10);
      }
    }

    this.formulario = this.formBuilder.group({
      anotacoes: [this.usuarioEditado.anotacoes],
      ativo: [this.usuarioEditado.ativo],
      bairro: [this.usuarioEditado.bairro],
      cargo: [this.usuarioEditado.cargo],
      cep: [this.usuarioEditado.cep],
      cidade: [this.usuarioEditado.cidade],
      cnh: [this.usuarioEditado.cnh],
      cnh_data_emissao: [cnh_data_emissao],
      cnh_data_vencimento: [cnh_data_vencimento],
      codigo_externo: [this.usuarioEditado.codigo_externo],
      codigo_regime_tributario: [this.usuarioEditado.codigo_regime_tributario],
      complmento: [this.usuarioEditado.complmento],
      cpf_cnpj: [this.usuarioEditado.cpf_cnpj, [Validators.required, ValidationService.validarCPF_CNPJ]],
      ctps: [this.usuarioEditado.ctps],
      ctps_serie: [this.usuarioEditado.ctps_serie],
      data_cadastro: [data_cadastro],
      data_nascimento_fundacao: [data_nascimento_fundacao],
      email: [this.usuarioEditado.email, [ValidationService.emailValidator]],
      empregador: [this.usuarioEditado.empregador],
      endereco: [this.usuarioEditado.endereco],
      estado_civil: [this.usuarioEditado.estado_civil],
      genero: [this.usuarioEditado.genero],
      inscricao_estadual: [this.usuarioEditado.inscricao_estadual],
      inscricao_municipal: [this.usuarioEditado.inscricao_municipal],
      matricula: [this.usuarioEditado.matricula],
      naturalidade: [this.usuarioEditado.naturalidade],
      nome: [this.usuarioEditado.nome, [Validators.required, Validators.minLength(5)]],
      nome_conjuge: [this.usuarioEditado.nome_conjuge],
      nome_mae: [this.usuarioEditado.nome_mae],
      nome_pai: [this.usuarioEditado.nome_pai],
      numero: [this.usuarioEditado.numero],
      pessoal_contato: [this.usuarioEditado.pessoal_contato],
      pk: [this.usuarioEditado.pk],
      plano_contas_pagar: [this.usuarioEditado.plano_contas_pagar],
      plano_contas_receber: [this.usuarioEditado.plano_contas_receber],
      razao_social: [this.usuarioEditado.razao_social],
      reservista: [this.usuarioEditado.reservista],
      rg: [this.usuarioEditado.rg],
      rg_data_emissao: [rg_data_emissao],
      rg_orgao_emissor: [this.usuarioEditado.rg_orgao_emissor],
      rg_uf_orgao_emissor: [this.usuarioEditado.rg_uf_orgao_emissor],
      site: [this.usuarioEditado.site],
      telefone: [this.usuarioEditado.telefone],
      telefone2: [this.usuarioEditado.telefone2],
      telefone_celular: [this.usuarioEditado.telefone_celular],
      telefone_recado: [this.usuarioEditado.telefone_recado],
      tipo_pessoa: [this.usuarioEditado.tipo_pessoa],
      titulo_eleitor: [this.usuarioEditado.titulo_eleitor],
      titulo_eleitor_sessao: [this.usuarioEditado.titulo_eleitor_sessao],
      titulo_eleitor_zona: [this.usuarioEditado.titulo_eleitor_zona],
      uf: [this.usuarioEditado.uf],
    });

    var forms = this.formulario;
  }

  ngOnDestroy() {
    this.usuarioEditado = [];
  }

  salvarDados() {
    if (this.formulario.value.nome === null ||
      this.formulario.value.nome.trim() === '' ||
      this.formulario.value.cpf_cnpj === null) {
      this.erro = true;
      this.mensagem_erro = 'Informe os dados necessários para continuar';
    } else {
      this.erro = false;
      this.mensagem_erro = '';
      this.options.insereParceiroNegocios(this.formulario.value);
    }
  }

  editarDados() {
    if (this.formulario.value.nome === null || this.formulario.value.nome.trim() === '' ||
      this.formulario.value.cpf_cnpj === null) {
      this.erro = true;
      this.mensagem_erro = 'Informe os dados necessários para continuar';
      this.modalConfirmacao.close();
    } else {
      this.erro = false;
      this.mensagem_erro = '';
      this.options.alteraParceiroNegocios(this.formulario.value);
      this.modalConfirmacao.close();
    }
  }

  excluirDados() {
    if (this.formulario.value.nome === null || this.formulario.value.nome.trim() === '') {
      this.erro = true;
      this.mensagem_erro = 'Sem usuários para excluir';
      this.modalConfirmacao.close();
    } else {
      this.erro = false;
      this.mensagem_erro = '';
      this.options.excluirParceiroNegocios(this.formulario.value);
      this.modalConfirmacao.close();
    }
  }

  confirmacaoExclusao(modal) {
    this.modalConfirmacao = this.modal.open(modal, { size: 'sm', backdrop: 'static' });
  }

  confirmacaoEdicao(modal) {
    this.modalConfirmacao = this.modal.open(modal, { size: 'sm', backdrop: 'static' });
  }

  Close() {
    this.usuarioEditado = [];
    this.options.JoinAndClose();
  }
}
