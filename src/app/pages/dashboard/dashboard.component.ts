import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import _ from 'lodash';
import { takeWhile } from 'rxjs/operators';

import { CampanhasApiService } from './../../api/campanhas';
import { DiasUteisPeriodoApiService } from './../../api/dias-uteis-periodo';
import { IndiceContratosDigitadosApiService } from './../../api/indice-contratos-digitados';
import { TicketMedioApiService } from './../../api/ticket-medio';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {

  private alive = true;

  solarValue: number;

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [];

  statusCardsByThemes: {
    default: CardSettings[];
    dark: CardSettings[];
  } = {
      default: this.commonStatusCardsSet,
      dark: this.commonStatusCardsSet,
    };

  filtro = {
    campanha: {
      label: 'Campanha',
      codigo: 0
    }

  }

  campanhaSelecionada: any;
  campanhasPerfil = [];
  contratosPagos = [];
  contratosDigitados = [];
  contratosPagosSinteticos = {
    "qtd_total_digitado": 0,
    "qtd_total_pago": 0,
    "relacao_qtd_digitado_pago": 0,
    "relacao_valor_digitado_pago": 0,
    "valor_elegivel_total_digitado": 0,
    "valor_elegivel_total_pago": 0
  };
  campanhaDias = 0;
  campanhaPendencias = 0;
  ticketPerfil = 0;
  ticketGlobal = 0;
  dadosCampanhaMetas = [];
  perfis = [
    {
      id: 5,
      label: 'Diretor'
    },
    {
      id: 4,
      label: 'Regional'
    },
    {
      id: 3,
      label: 'Comercial'
    },
    {
      id: 2,
      label: 'Loja'
    },
    {
      id: 1,
      label: 'Consumidor'
    }
  ];

  constructor(
    private themeService: NbThemeService,
    private campanhasApiService: CampanhasApiService,
    private diasUteisPeriodoApiService: DiasUteisPeriodoApiService,
    private ticketMedioApiService: TicketMedioApiService,
    private indiceContratosDigitadosApiService: IndiceContratosDigitadosApiService
  ) {

    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });
    this.findCampanha();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  findCampanha() {
    this.campanhasPerfil = [];
    this.campanhasApiService.perfil()
      .then((s) => {
        this.campanhasPerfil = s;
        this.atualizarFiltro(this.campanhasPerfil[0]);
      })
      .catch((e) => {
        console.log(e)
      });
  }

  findCampanhaMeta(visao = 5) {
    this.dadosCampanhaMetas = [];
    this.campanhasApiService.metas(
      {
        "codigo_campanha": this.filtro.campanha.codigo,
        "visao": visao
      }
    )
      .then((s) => {
        this.dadosCampanhaMetas = s;
      })
      .catch((e) => {
        console.log(e)
      });
  }

  findContratos() {
    this.contratosPagos = [];
    this.contratosDigitados = [];
    this.indiceContratosDigitadosApiService.pagos({
      "codigo_campanha": this.filtro.campanha.codigo,
      "codigo_regional": "",
      "codigo_comercial": "",
      "codigo_loja": "",
      "codigo_funcionario": ""
    })
      .then((s) => {
        this.contratosPagos = _.filter(s, (o: any) => {
          return String(o.status) === 'PAGAS';
        });
        this.contratosDigitados = _.filter(s, (o: any) => {
          return String(o.status) === 'DIGITADAS';
        });
      })
      .catch((e) => {
        console.log(e)
      });


    this.contratosPagosSinteticos = {
      "qtd_total_digitado": 0,
      "qtd_total_pago": 0,
      "relacao_qtd_digitado_pago": 0,
      "relacao_valor_digitado_pago": 0,
      "valor_elegivel_total_digitado": 0,
      "valor_elegivel_total_pago": 0
    };
    this.indiceContratosDigitadosApiService.sintetico({
      "codigo_campanha": this.filtro.campanha.codigo,
      "codigo_regional": "",
      "codigo_comercial": "",
      "codigo_loja": "",
      "codigo_funcionario": ""
    })
      .then((s) => {
        for (let i of s) {
          this.contratosPagosSinteticos = i;
        }

      })
      .catch((e) => {
        console.log(e)
      });
  }

  findDiasUteis() {
    this.diasUteisPeriodoApiService.periodo(
      {
        "data_inicial": this.campanhaSelecionada.data_inicio_campanha,
        "data_final": this.campanhaSelecionada.data_fim_campanha
      }
    )
      .then((s) => {
        this.campanhaDias = s.qtd_dias_uteis;
      })
      .catch((e) => {
        console.log(e);
      })
    this.diasUteisPeriodoApiService.periodo(
      {
        "data_inicial": this.campanhaSelecionada.data_inicio_pendencia_fisico,
        "data_final": this.campanhaSelecionada.data_fim_pendencia_fisico
      }
    )
      .then((s) => {
        this.campanhaPendencias = s.qtd_dias_uteis;
      })
      .catch((e) => {
        console.log(e);
      })
  }

  findTickets() {
    this.ticketPerfil = 0;
    this.ticketGlobal = 0;
    this.ticketMedioApiService.perfil({
      "codigo_campanha": this.filtro.campanha.codigo,
      "codigo_regional": "",
      "codigo_comercial": "",
      "codigo_loja": "",
      "codigo_funcionario": ""
    })
      .then((s) => {
        this.ticketPerfil = s.ticket_medio_perfil;
      })
      .catch((e) => {
        console.log(e)
      });
    this.ticketMedioApiService.global({
      "codigo_campanha": this.filtro.campanha.codigo,
      "codigo_regional": "",
      "codigo_comercial": "",
      "codigo_loja": "",
      "codigo_funcionario": ""
    })
      .then((s) => {
        this.ticketGlobal = s.ticket_medio_global;
      })
      .catch((e) => {
        console.log(e)
      });
  }

  atualizarFiltro(item) {
    this.filtro.campanha.codigo = item.codigo_campanha;
    this.campanhaSelecionada = item;
    this.findContratos();
    this.findDiasUteis();
    this.findTickets();
    this.findCampanhaMeta(5);
  }

  filtraCampanhaPerfil(event) {
    console.log(event.tabTitle);
    let find = _.find(this.perfis, (o: any) => {
      return String(o.label) === String(event.tabTitle);
    })
    this.findCampanhaMeta(find.id);
  }

}
