import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientesComponent } from '../clientes.component';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'dados-cadastro',
  templateUrl: './dados-cadastro.component.html',
  styleUrls: ['./dados-cadastro.component.scss']
})
export class DadosCadastroComponent implements OnInit, OnDestroy {

  usuarioEditado: any;
  edicaoUsuario: boolean;
  criacaoUsuario: boolean;
  formulario: FormGroup;

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
    "AC", "AL", "AP", "AM", "BA",
    "CE", "DF", "ES", "GO", "MA",
    "MT", "MS", "MG", "PA", "PB",
    "PR", "PE", "PI", "RJ", "RN",
    "RS", "RO", "RR", "SC", "SP",
    "SE", "TO"];

  selectedUfId = 'AC';

  constructor(private options: ClientesComponent,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.usuarioEditado = [];
    this.edicaoUsuario = this.options.edicaoUsuario;
    this.criacaoUsuario = this.options.criacaoUsuario;
    if (this.options.usuarioEdicao.length !== 0) {
      this.usuarioEditado = this.options.usuarioEdicao;
    }

    this.formulario = this.formBuilder.group({
      nome: [this.usuarioEditado.nome],
      cpf: [this.usuarioEditado.cpf],
      codigo: [this.usuarioEditado.cpf],
      data_cadastro: [this.usuarioEditado.data_emissao],
      endereco: [this.usuarioEditado.endereco],
      telefone1: [this.usuarioEditado.telefone],
      uf: [this.usuarioEditado.uf],
      cep: [this.usuarioEditado.cep],
      data_fundacao: [this.usuarioEditado.data_fundacao],
      nome_mae: [this.usuarioEditado.nome_mae],
      nome_pai: [this.usuarioEditado.nome_pai],
      numero: [this.usuarioEditado.numero],
      telefone2: [this.usuarioEditado.telefone2],
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
    this.options.insereUsuarios(this.formulario.value);
  }

  editarDadosUsuario() {
    this.options.alteraUsuarios(this.formulario.value);
  }

  Close() {
    this.usuarioEditado = [];
    this.options.JoinAndClose();
  }
}
