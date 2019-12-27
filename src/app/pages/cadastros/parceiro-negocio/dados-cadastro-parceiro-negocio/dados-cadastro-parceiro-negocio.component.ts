import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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

  @Input() cpfOUCnpj: string = '';

  usuarioEditado: any;
  edicaoUsuario: boolean;
  criacaoUsuario: boolean;
  permissaoExclusao: boolean;
  formulario: FormGroup;
  selectedOption;
  erro: boolean = false;
  mensagem_erro: string = '';
  modalConfirmacao: NgbModalRef;
  mascara = ['000.000.000-000', '00.000.000/0000-00'];
  mascaraTelefone = ['(00) 0000-00009', '(00) 00000-0000'];

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
    var dd = data.getDate() + 1;
    var mm = data.getMonth() + 1;
    var yyyy = data.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    var dataFormatada = new Date(String(String(yyyy) + '-' + String(mm) + '-' + String(dd)));
    return dataFormatada;
  }

  formataDataFundacao(data) {
    var dd = data.getDate() + 1;
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

    var cnh_data_emissao: any;
    var cnh_data_vencimento: any;
    var data_nascimento_fundacao: any;
    var data_cadastro: any;
    var rg_data_emissao: any;
    var cpf_cnpj: string = '';
    var telefone1: string = '';
    var telefone2: string = '';
    var celular: string = '';
    var recado: string = '';


    if (this.options.usuarioEdicao.length !== 0) {
      this.usuarioEditado = this.options.usuarioEdicao;

      if (this.usuarioEditado.cnh_data_emissao !== null) {
        cnh_data_emissao = new Date(String(this.usuarioEditado.cnh_data_emissao.substr(0, 10)));
        cnh_data_emissao.setDate(cnh_data_emissao.getDate() + 1);
      }
      if (this.usuarioEditado.cnh_data_vencimento !== null) {
        cnh_data_vencimento = new Date(String(this.usuarioEditado.cnh_data_vencimento.substr(0, 10)));
        cnh_data_vencimento.setDate(cnh_data_vencimento.getDate() + 1);
      }
      if (this.usuarioEditado.data_nascimento_fundacao !== null) {
        // tslint:disable-next-line: max-line-length
        data_nascimento_fundacao = new Date(String(this.usuarioEditado.data_nascimento_fundacao.substr(0, 10)));
        data_nascimento_fundacao.setDate(data_nascimento_fundacao.getDate() + 1);
      }
      if (this.usuarioEditado.rg_data_emissao !== null) {
        rg_data_emissao = new Date(String(this.usuarioEditado.rg_data_emissao.substr(0, 10)));
        rg_data_emissao.setDate(rg_data_emissao.getDate() + 1);
      }

      if (this.usuarioEditado.telefone !== null && this.usuarioEditado.telefone !== undefined) {
        telefone1 = String(this.usuarioEditado.telefone);
      }
      if (this.usuarioEditado.telefone2 !== null && this.usuarioEditado.telefone2 !== undefined) {
        telefone2 = String(this.usuarioEditado.telefone2);
      }
      if (this.usuarioEditado.telefone_celular !== null && this.usuarioEditado.telefone_celular !== undefined) {
        celular = String(this.usuarioEditado.telefone_celular);
      }
      if (this.usuarioEditado.telefone_recado !== null && this.usuarioEditado.telefone_recado !== undefined) {
        recado = String(this.usuarioEditado.telefone_recado);
      }

      ///DATA CADASTRO
      if (this.usuarioEditado.data_cadastro !== null) {
        data_cadastro = this.formataDataFundacao(new Date(String(this.usuarioEditado.data_cadastro.substr(0, 10))));
      }

      if (this.usuarioEditado.cpf_cnpj !== null) {
        cpf_cnpj = String(this.usuarioEditado.cpf_cnpj).trim();
        if (cpf_cnpj.length <= 11) {
          this.mascara = ['000.000.000-00', '000.000.000-00'];
        } else {
          this.mascara = ['00.000.000/0000-00', '00.000.000/0000-00'];
        }
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
      cpf_cnpj: [cpf_cnpj, [Validators.required, ValidationService.validarCPF_CNPJ]],
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
      telefone: [telefone1],
      telefone2: [telefone2],
      telefone_celular: [celular],
      telefone_recado: [recado],
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
