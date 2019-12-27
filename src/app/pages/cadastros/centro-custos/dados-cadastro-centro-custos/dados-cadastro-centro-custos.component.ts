import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CentroCustosComponent } from '../centro-custos.component';

@Component({
  selector: 'dados-cadastro-centro-custos',
  templateUrl: './dados-cadastro-centro-custos.component.html',
  styleUrls: ['./dados-cadastro-centro-custos.component.scss']
})
export class DadosCadastroCentroCustosComponent implements OnInit, OnDestroy {

  dadosEditado: any;
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

  constructor(private options: CentroCustosComponent,
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
      classificacao: [this.dadosEditado.classificacao, [Validators.required, Validators.minLength(5)]],
      pk: [this.dadosEditado.pk],
      nome: [this.dadosEditado.nome, [Validators.required]],
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
      this.options.insereCentroCustos(this.formulario.value);
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
      this.options.alteraCentroCustos(this.formulario.value);
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
      this.options.excluirCentroCustos(this.formulario.value);
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
