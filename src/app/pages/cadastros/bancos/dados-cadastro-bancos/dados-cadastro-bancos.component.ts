import { Component, OnInit, OnDestroy } from '@angular/core';
import { BancosComponent } from '../bancos.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../../validation.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'dados-cadastro-bancos',
  templateUrl: './dados-cadastro-bancos.component.html',
  styleUrls: ['./dados-cadastro-bancos.scss'],
})
export class DadosCadastroBancosComponent implements OnInit, OnDestroy {

  usuarioEditado: any;
  edicaoUsuario: boolean;
  criacaoUsuario: boolean;
  permissaoExclusao: boolean;
  formulario: FormGroup;
  selectedOption;
  erro: boolean = false;
  mensagem_erro: string = '';
  modalConfirmacao: NgbModalRef;

  /*estados = [
    { sigla: "AC" },
    { sigla: "AL" },
    { sigla: "AP" },
    { sigla: "AM" },
    { sigla: "BA" },
    { sigla: "CE" },
    { sigla: "DF" },
    { sigla: "ES" },
    { sigla: "GO" },
    { sigla: "MA" },
    { sigla: "MS" },
    { sigla: "MT" },
    { sigla: "MG" },
    { sigla: "PA" },
    { sigla: "PB" },
    { sigla: "PR" },
    { sigla: "PE" },
    { sigla: "PI" },
    { sigla: "RJ" },
    { sigla: "RN" },
    { sigla: "RS" },
    { sigla: "RO" },
    { sigla: "RR" },
    { sigla: "SC" },
    { sigla: "SP" },
    { sigla: "SE" },
    { sigla: "TO" },
  ];*/

  estados = [
    'AC', 'AL', 'AP', 'AM', 'BA',
    'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB',
    'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP',
    'SE', 'TO'];

  constructor(private options: BancosComponent,
    private modal: NgbModal,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.usuarioEditado = [];
    this.edicaoUsuario = this.options.edicaoUsuario;
    this.criacaoUsuario = this.options.criacaoUsuario;
    this.permissaoExclusao = this.options.permissaoDelete;
    if (this.options.usuarioEdicao.length !== 0) {
      this.usuarioEditado = this.options.usuarioEdicao;
    }

    this.formulario = this.formBuilder.group({
      nome: [this.usuarioEditado.nome, [Validators.required, Validators.minLength(10)]],
      cpf: [this.usuarioEditado.cpf, [Validators.required, ValidationService.validarCPF_CNPJ]],
      codigo: [this.usuarioEditado.cpf],
      data_cadastro: [this.usuarioEditado.data_emissao],
      endereco: [this.usuarioEditado.endereco],
      telefone1: [this.usuarioEditado.telefone],
      telefone2: [this.usuarioEditado.telefone2],
      uf: [this.usuarioEditado.uf],
      cep: [this.usuarioEditado.cep],
      data_fundacao: [this.usuarioEditado.data_fundacao],
      nome_mae: [this.usuarioEditado.nome_mae],
      nome_pai: [this.usuarioEditado.nome_pai],
      numero: [this.usuarioEditado.numero],
      complemento: [this.usuarioEditado.complemento],
      celular: [this.usuarioEditado.celular],
      bairro: [this.usuarioEditado.bairro],
      recado: [this.usuarioEditado.recado],
      cidade: [this.usuarioEditado.cidade],
    });
  }

  ngOnDestroy() {
    this.usuarioEditado = [];
  }

  salvarDadosUsuario() {
    if (this.formulario.value.nome === null || this.formulario.value.nome.trim() === '') {
      this.erro = true;
      this.mensagem_erro = 'Informe o nome do usuário para continuar';
    } else {
      this.erro = false;
      this.mensagem_erro = '';
      this.options.insereUsuarios(this.formulario.value);
    }
  }

  editarDadosUsuario() {
    if (this.formulario.value.nome === null || this.formulario.value.nome.trim() === '') {
      this.erro = true;
      this.mensagem_erro = 'Informe o nome do usuário para continuar';
      this.modalConfirmacao.close();
    } else {
      this.erro = false;
      this.mensagem_erro = '';
      this.options.alteraUsuarios(this.formulario.value);
      this.modalConfirmacao.close();
    }
  }

  excluirDadosUsuario() {
    if (this.formulario.value.nome === null || this.formulario.value.nome.trim() === '') {
      this.erro = true;
      this.mensagem_erro = 'Sem usuários para excluir';
      this.modalConfirmacao.close();
    } else {
      this.erro = false;
      this.mensagem_erro = '';
      this.options.excluirUsuarios(this.formulario.value);
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
