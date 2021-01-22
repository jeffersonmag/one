import { Component, OnInit } from '@angular/core';
import { ComissoesPagasApiService } from '../../api/comissoes-pagas';
import { SessionService } from '../../services/session.service';

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

  constructor(
    private ComissoesApiService: ComissoesPagasApiService
  ) { 
    this.buscarComissoesPagas();
  }

  buscarComissoesPagas(){
    this.ComissoesApiService.ComissoesPagasSintetico(
      {
        'cpf_cliente': window.sessionStorage.cpf_usuario_logado
      }
    )
      .then((s) => {
        this.mesAtual = s;               
      })
      .catch((e) => {
        console.log(e);
      });

  }

  ngOnInit(): void {
  }

}
