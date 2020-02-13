import { Component, OnInit } from '@angular/core';
import { CadastrosApiService } from '../../../api/cadastros';
import { NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-plano-contas',
  templateUrl: './plano-contas.component.html',
  styleUrls: ['./plano-contas.component.scss']
})
export class PlanoContasComponent implements OnInit {

  dados: any;
  value = '';
  ativaBotaoPesquisa: boolean = false;
  formulario: FormGroup;
  habilitaBotaoSalvar: boolean = true;
  toggle_orcavel: boolean = false;
  toggle_cc: boolean = false;

  permissoes: any = JSON.parse(window.sessionStorage.permissao_acesso);
  permissaoDelete: boolean = this.permissoes.cadastro_plano_de_contas.acl.D;
  permissaoInsert: boolean = this.permissoes.cadastro_plano_de_contas.acl.I;
  permissaoSelect: boolean = this.permissoes.cadastro_plano_de_contas.acl.S;
  permissaoUpdate: boolean = this.permissoes.cadastro_plano_de_contas.acl.U;

  constructor(private campanhasApiService: CadastrosApiService,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder) {
    this.buscaPlanoContas('');
    this.formulario = this.formBuilder.group({
      codigo: [''],
      classificacao: [''],
      nome: [''],
      natureza: [''],
      orcavel: [false],
      tipo_conta_corrente: [''],
      conta_corrente: [false],
    });
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  cancelar() {
    this.habilitaBotaoSalvar = true;
    this.formulario = this.formBuilder.group({
      codigo: [''],
      classificacao: [''],
      nome: [''], //Débito ou Crédito
      natureza: [''],
      orcavel: [false],
      tipo_conta_corrente: [''],
      conta_corrente: [false],
    });
    this.buscaPlanoContas('');
  }

  buscaPlanoContas(valor?) {
    if (valor === '') {
      this.value = '';
      this.ativaBotaoPesquisa = false;
    }
    this.campanhasApiService.getPlanoContas(
      {
        'pesquisa': valor,
      },
    )
      .then((s) => {
        this.dados = [];
        this.formulario = this.formBuilder.group({
          codigo: [this.dados.pk],
          classificacao: [this.dados.classificacao],
          nome: [this.dados.nome], //Débito ou Crédito
          natureza: [this.dados.d_c],
          orcavel: [this.dados.orcavel],
          tipo_conta_corrente: [this.dados.codigo_tipo_conta_corrente],
          conta_corrente: [this.dados.conta_corrente],
        });

        this.dados = s;
      })
      .catch((e) => {
        this.makeToast('danger', 'Ocorreu um erro!', e.error.message);
      });
  }

  color = 'accent';
  checked = false;
  disabled = false;

  habilitareditarDados(dados) {
    this.habilitaBotaoSalvar = false;

    this.formulario = this.formBuilder.group({
      codigo: [dados.pk],
      classificacao: [dados.classificacao],
      nome: [dados.nome], //Débito ou Crédito
      natureza: [dados.d_c],
      orcavel: [dados.orcavel],
      tipo_conta_corrente: [dados.codigo_tipo_conta_corrente],
      conta_corrente: [dados.conta_corrente],
    });
  }

  salvarDados() {
    this.habilitaBotaoSalvar = true;
    this.campanhasApiService.postPlanoContas(
      {
        'classificacao': this.formulario.value.classificacao,
        'nome': this.formulario.value.nome,
        'd_c': this.formulario.value.natureza,
        'orcavel': this.formulario.value.orcavel,
        'conta_corrente': this.formulario.value.conta_corrente,
        'codigo_tipo_conta_corrente': null,
      },
    )
      .then((s) => {
        this.makeToast('success', 'Sucesso!', 'Plano de contas inserido com sucesso!');
        this.buscaPlanoContas('');
      })
      .catch((e) => {
        this.makeToast('danger', 'Ocorreu um erro!', e.error.message);
      });
  }

  editarDados() {
    this.habilitaBotaoSalvar = true;
    this.campanhasApiService.putPlanoContas(
      {
        'classificacao': this.formulario.value.classificacao,
        'nome': this.formulario.value.nome,
        'd_c': this.formulario.value.natureza,
        'orcavel': this.formulario.value.orcavel,
        'conta_corrente': this.formulario.value.conta_corrente,
        'codigo_tipo_conta_corrente': null,
        'pk': this.formulario.value.codigo,
      },
    )
      .then((s) => {
        this.makeToast('success', 'Sucesso!', 'Plano de contas editado com sucesso!');
        this.buscaPlanoContas('');
      })
      .catch((e) => {
        this.makeToast('danger', 'Ocorreu um erro!', e.error.message);
        this.habilitaBotaoSalvar = false;
      });
  }

  excluirDados() {
    this.habilitaBotaoSalvar = true;
    this.campanhasApiService.delPlanoContas(
      {
        'pk': this.formulario.value.codigo,
      },
    )
      .then((s) => {
        this.makeToast('success', 'Sucesso!', 'Plano de contas excluídos com sucesso!');
        this.formulario = this.formBuilder.group({
          codigo: [''],
          classificacao: [''],
          nome: [''], //Débito ou Crédito
          natureza: [''],
          orcavel: [false],
          tipo_conta_corrente: [''],
          conta_corrente: [false],
        });
        this.buscaPlanoContas('');
      })
      .catch((e) => {
        this.makeToast('danger', 'Erro!', e.error.message);
      });
  }

  ngOnInit() {
  }

  makeToast(type: NbComponentStatus, title: string, body: string) {
    var destroyByClick = true;
    var duration = 5000;
    var hasIcon = true;
    var position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
    var preventDuplicates = true;
    var status: NbComponentStatus = 'success';
    var titulo: string = 'Sucesso';
    var mensagem: string = 'Ação realizada com sucesso!';
    const config = {
      status: type,
      destroyByClick: destroyByClick,
      duration: duration,
      hasIcon: hasIcon,
      position: position,
      preventDuplicates: preventDuplicates,
    };
    const titleContent = title ? `${title}` : '';

    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }

}
