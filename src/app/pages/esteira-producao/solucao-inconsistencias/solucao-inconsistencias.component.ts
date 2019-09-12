import { Component, OnInit, Input } from '@angular/core';
import { EsteiraProducaoApiService } from '../../../api/esteira-producao';
import { EsteiraProducaoComponent } from '../esteira-producao.component';

import 'style-loader!angular2-toaster/toaster.css';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from '@nebular/theme';

@Component({
  selector: 'solucao-inconsistencias',
  templateUrl: './solucao-inconsistencias.component.html',
  styleUrls: ['./solucao-inconsistencias.component.scss']
})
export class SolucaoInconsistenciasComponent implements OnInit {

  @Input() cValue;
  @Input() dValue;
  listaAcoes = [];
  proposta: number;
  acao_escolhida: string = '';
  codigo_inconsistencia: number;
  codigo_acao_predefinida: number;

  index = 1;
  destroyByClick = true;
  duration = 5000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = true;
  status: NbComponentStatus = 'success';
  titulo: string = 'Sucesso';
  mensagem: string = 'Ação realizada com sucesso!';

  constructor(private EsteiraProducaoApiService: EsteiraProducaoApiService,
    private options: EsteiraProducaoComponent,
    private toastrService: NbToastrService) {
    this.findListaAcoes();
  }

  findListaAcoes() {
    this.listaAcoes = [];
    this.EsteiraProducaoApiService
      .listarAcoesPredefinidas().then((s) => {
        this.listaAcoes = s;
      })
      .catch((e) => {
        console.log(e)
      });
  }

  carregarInput(texto, cod_acao_predefinida) {
    this.acao_escolhida = texto;
    this.codigo_inconsistencia = this.options.codigo_contratos_inconsistencia;
    this.codigo_acao_predefinida = cod_acao_predefinida;
  }

  resolverInconsistencia() {
    this.EsteiraProducaoApiService
      .resolveInconsistenciaAcao(
        {
          "codigo_inconsistencia": this.codigo_inconsistencia,
          "codigo_acao_predefinida": this.codigo_acao_predefinida,
          "descricao_acao": this.acao_escolhida
        }
      ).then((s) => {
        this.close();
        this.makeToast(this.status, this.titulo, this.mensagem);
      })
      .catch((e) => {
        console.log(e)
      });
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

  close() {
    this.options.JoinAndClose();
  }

  ngOnInit() {
  }

}
