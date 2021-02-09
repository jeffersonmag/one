import { Component, OnInit } from '@angular/core';
import { ComissoesPagasApiService } from '../../api/comissoes-pagas';
import _ from 'lodash';

@Component({
  selector: 'ngx-comissoes-pagas',
  templateUrl: './comissoes-pagas.component.html',
  styleUrls: ['./comissoes-pagas.component.scss']
})
export class ComissoesPagasComponent implements OnInit {

  mes = [
    {
      id: 1,
      label: 'Jan',
      mesExtenso: 'Janeiro',
    },
    {
      id: 2,
      label: 'Fev',
      mesExtenso: 'Fevereiro',
    },
    {
      id: 3,
      label: 'Mar',
      mesExtenso: 'Março',
    },
    {
      id: 4,
      label: 'Abr',
      mesExtenso: 'Abril',
    },
    {
      id: 5,
      label: 'Mai',
      mesExtenso: 'Maio',
    },
    {
      id: 6,
      label: 'Jun',
      mesExtenso: 'Junho',
    },
    {
      id: 7,
      label: 'Jul',
      mesExtenso: 'Julho',
    },
    {
      id: 8,
      label: 'Ago',
      mesExtenso: 'Agosto',
    },
    {
      id: 9,
      label: 'Set',
      mesExtenso: 'Setembro',
    },
    {
      id: 10,
      label: 'Out',
      mesExtenso: 'Outubro',
    },
    {
      id: 11,
      label: 'Nov',
      mesExtenso: 'Novembro',
    },
    {
      id: 12,
      label: 'Dez',
      mesExtenso: 'Dezembro',
    },
  ];

  mesAtual = '';
  mesAnterior = '';
  mesAAnterior = '';
  comissoesPagasMeses: any[];
  comissoesPagas: any[];
  mesesAbas = [];

  constructor(
    private ComissoesApiService: ComissoesPagasApiService
  ) {
    this.buscarComissoesPagas();
  }

  buscarComissoesPagas() {
    this.ComissoesApiService.ComissoesPagasSintetico(
      {
        'cpf_cliente': String(window.sessionStorage.cpf_usuario_logado)
        // 'cpf_cliente': '25932858850'
      }
    )
      .then((s) => {
        this.comissoesPagasMeses = s;
        for (let i of this.comissoesPagasMeses) {
          this.mesesAbas.push(i = {
            "vencimento_mes": i.vencimento_mes,
          })
        }
        this.mesesAbas = this.mesesAbas.filter(function (a) {
          return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
        }, Object.create(null))
      })
      .catch((e) => {
        console.log(e);
      });
  }

  filtraMesTabComissoesPagas(event) {
    let mes = _.find(this.mes, (o: any) => {
      if (String(o.mesExtenso) === String(event.tabTitle)) {
        return String(o.id)
      }
    })
    this.comissoesPagas = this.comissoesPagasMeses.filter(comissao => comissao.vencimento_mes == mes.id);
    console.log(this.comissoesPagas);
  }

  ngOnInit(): void {
  }

}
