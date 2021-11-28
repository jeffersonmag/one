import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  diasUteis: number = 0;
  diasUteisRestantes: number = 0;
  metaTotal: number = 0;
  realizado: number = 0;
  projetado: number = 0;
  metaDiaria: number = 0;
  metaDiariaRecalculada: number = 0;
  propostas: number = 0;
  clientes: number = 0;
  ticketMedio: number = 0;
  barraProgresso: number = 0;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getHeader();
  }

  getHeader() {
    this.apiService.getHeadereDiasUteis()
      .then((s) => { this.diasUteis = s.dias });

    this.apiService.getHeadereDiasUteisRestantes()
      .then((s) => { this.diasUteisRestantes = s.dias });

    this.apiService.getHeaderMetaTotal()
      .then((s) => { this.metaTotal = s.meta_producao });

    this.apiService.getHeaderMetaRealizada()
      .then((s) => {
        this.realizado = s.meta_realizada
        this.clientes = s.clientes_atendidos
        this.ticketMedio = s.ticket_medio
        this.barraProgresso = (this.realizado / this.metaTotal) * 100;
      });

    this.apiService.getHeaderMetaProjetada()
      .then((s) => { this.projetado = s.total_realizado });

    this.apiService.getHeaderMetaDiaria()
      .then((s) => { this.metaDiaria = s.meta_diaria });

    this.apiService.getHeaderMetaRecalculada()
      .then((s) => { this.metaDiariaRecalculada = s.meta_recalculada });

    this.apiService.getHeaderQuantidadePropostas()
      .then((s) => { this.propostas = s.qtd_propostas });
  }

}
