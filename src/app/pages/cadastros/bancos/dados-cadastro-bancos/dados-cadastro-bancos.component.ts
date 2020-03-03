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

  dadosEditado: any;
  edicaoUsuario: boolean;
  criacaoUsuario: boolean;
  permissaoExclusao: boolean;
  formulario: FormGroup;
  selectedOption;
  erro: boolean = false;
  mensagem_erro: string = '';
  modalConfirmacao: NgbModalRef;

  constructor(private options: BancosComponent,
    private modal: NgbModal,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.dadosEditado = [];
    this.edicaoUsuario = this.options.edicaoUsuario;
    this.criacaoUsuario = this.options.criacaoUsuario;
    this.permissaoExclusao = this.options.permissaoDelete;
    if (this.options.usuarioEdicao.length !== 0) {
      this.dadosEditado = this.options.usuarioEdicao;
    }

    this.formulario = this.formBuilder.group({
      nome: [this.dadosEditado.nome, [Validators.required, Validators.minLength(5)]],
      pk: [this.dadosEditado.pk],
      codigo: [this.dadosEditado.codigo, [Validators.required]],
    });
  }

  ngOnDestroy() {
    this.dadosEditado = [];
  }

  salvarDados() {
    if (this.formulario.value.nome === null || this.formulario.value.nome.trim() === '') {
      this.erro = true;
      this.mensagem_erro = 'Informe os dados necessários para continuar';
    } else {
      this.erro = false;
      this.mensagem_erro = '';
      this.options.insereBancos(this.formulario.value);
    }
  }

  editarDados() {
    if (this.formulario.value.nome === null || this.formulario.value.nome.trim() === '') {
      this.erro = true;
      this.mensagem_erro = 'Informe os dados necessários para continuar';
      this.modalConfirmacao.close();
    } else {
      this.erro = false;
      this.mensagem_erro = '';
      this.options.alteraBancos(this.formulario.value);
      this.modalConfirmacao.close();
    }
  }

  excluirDados() {
    if (this.formulario.value.pk === null || this.formulario.value.pk === '') {
      this.erro = true;
      this.mensagem_erro = 'Sem dados inseridos para excluir';
      this.modalConfirmacao.close();
    } else {
      this.erro = false;
      this.mensagem_erro = '';
      this.options.excluirBancos(this.formulario.value);
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
    this.dadosEditado = [];
    this.options.JoinAndClose();
  }
}
