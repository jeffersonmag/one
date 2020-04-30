import { Component, OnInit } from '@angular/core';
import { CadastrosApiService } from '../../../api/cadastros';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.css']
})
export class ConfiguracoesComponent implements OnInit {

  pagar = true;
  receber = false;
  dadosPagarReceber: any;

  constructor(private CadastrosApiService: CadastrosApiService,
    private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.buscaConfiguracoesGerais();
  }

  buscaConfiguracoesGerais() {
    this.CadastrosApiService.getConfiguracoesGerais({})
      .then((s) => {
        this.dadosPagarReceber = s;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  exibePagar(valor) {
    this.pagar = valor;
    this.receber = !valor;
  }

  salvarConfiguracoesPagar(dados) {
    this.CadastrosApiService.putConfiguracoesGerais(
      {
        'padrao_plano_contas_pn_pagar_pk': dados.padrao_plano_contas_pn_pagar_pk,
        'padrao_plano_contas_pn_pagar_nome': dados.padrao_plano_contas_pn_pagar_nome,
        'padrao_plano_contas_multa_mora_paga_pk': dados.padrao_plano_contas_multa_mora_paga_pk,
        'padrao_plano_contas_multa_mora_paga_nome': dados.padrao_plano_contas_multa_mora_paga_nome,
        'padrao_plano_contas_juros_pago_pk': dados.padrao_plano_contas_juros_pago_pk,
        'padrao_plano_contas_juros_pago_nome': dados.padrao_plano_contas_juros_pago_nome,
        'padrao_plano_contas_descontos_obtidos_pk': dados.padrao_plano_contas_descontos_obtidos_pk,
        'padrao_plano_contas_descontos_obtidos_nome': dados.padrao_plano_contas_descontos_obtidos_nome,
      },
    )
      .then((s) => {
        //this.JoinAndClose();
        this.makeToast('success', 'Sucesso!', 'Dados Pagar salvos com sucesso!');
      })
      .catch((e) => {
        //this.JoinAndClose();
        this.makeToast('danger', 'Erro!', e.error.message);
      });
  };

  salvarConfiguracoesReceber(dados) {
    this.CadastrosApiService.putConfiguracoesGerais(
      {
        'padrao_plano_contas_pn_receber_pk': dados.padrao_plano_contas_pn_receber_pk,
        'padrao_plano_contas_pn_receber_nome': dados.padrao_plano_contas_pn_receber_nome,
        'padrao_plano_contas_multa_mora_recebida_pk': dados.padrao_plano_contas_multa_mora_recebida_pk,
        'padrao_plano_contas_multa_mora_recebida_nome': dados.padrao_plano_contas_multa_mora_recebida_nome,
        'padrao_plano_contas_juros_recebido_pk': dados.padrao_plano_contas_juros_recebido_pk,
        'padrao_plano_contas_juros_recebido_nome': dados.padrao_plano_contas_juros_recebido_nome,
        'padrao_plano_contas_descontos_concedidos_pk': dados.padrao_plano_contas_descontos_concedidos_pk,
        'padrao_plano_contas_descontos_concedidos_nome': dados.padrao_plano_contas_descontos_concedidos_nome,
      },
    )
      .then((s) => {
        //this.JoinAndClose();
        this.makeToast('success', 'Sucesso!', 'Dados Receber salvo com sucesso!');
      })
      .catch((e) => {
        //this.JoinAndClose();
        this.makeToast('danger', 'Erro!', e.error.message);
      });
  };

  makeToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 10000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: true,
    };
    const titleContent = title ? `${title}` : '';

    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }

}
