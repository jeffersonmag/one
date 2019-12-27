import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjetosComponent } from '../projetos.component';

@Component({
  selector: 'dados-cadastro-projetos',
  templateUrl: './dados-cadastro-projetos.component.html',
  styleUrls: ['./dados-cadastro-projetos.component.scss']
})
export class DadosCadastroProjetosComponent implements OnInit, OnDestroy {

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

  constructor(private options: ProjetosComponent,
    private modal: NgbModal,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.dadosEditado = [];
    this.edicaoUsuario = this.options.edicaoUsuario;
    this.criacaoUsuario = this.options.criacaoUsuario;
    this.permissaoExclusao = this.options.permissaoDelete;
    var vigencia_ate: any;
    var vigencia_de: any;

    if (this.options.dadosEdicao.length !== 0) {
      this.dadosEditado = this.options.dadosEdicao;
    }

    if (this.dadosEditado.vigencia_ate !== null && this.dadosEditado.vigencia_ate !== undefined) {
      vigencia_ate = new Date(String(this.dadosEditado.vigencia_ate.substr(0, 10)));
      vigencia_ate.setDate(vigencia_ate.getDate() + 1);
    }

    if (this.dadosEditado.vigencia_de !== null && this.dadosEditado.vigencia_de !== undefined) {
      vigencia_de = new Date(String(this.dadosEditado.vigencia_de.substr(0, 10)));
      vigencia_de.setDate(vigencia_de.getDate() + 1);
    }

    this.formulario = this.formBuilder.group({
      nome: [this.dadosEditado.nome, [Validators.required, Validators.minLength(1)]],
      pk: [this.dadosEditado.pk],
      vigencia_de: [vigencia_de, [Validators.required]],
      vigencia_ate: [vigencia_ate],
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
      this.options.insereProjetos(this.formulario.value);
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
      this.options.alteraProjetos(this.formulario.value);
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
      this.options.excluirProjetos(this.formulario.value);
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
