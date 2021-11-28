import { formatNumber } from '@angular/common';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../../../api/api.service';
declare var google: any;

@Component({
  selector: 'app-consultor',
  templateUrl: './consultor.component.html',
  styleUrls: ['./consultor.component.scss']
})
export class ConsultorComponent implements OnInit, AfterViewInit {
  @ViewChild('barChart') barChart!: ElementRef;

  public myDataConsultor: Array<Array<any>> = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getConsultor();
  }

  ngAfterViewInit(): void {
    google.charts.load('current', { packages: ['corechart', 'bar'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }

  getConsultor() {
    this.apiService.getComercial()
      .then((s) => {
        this.myDataConsultor = [...s.map((valor: any) => [valor.nome_comercial, valor.total_base_calculo, formatNumber(Number(valor.total_base_calculo), 'pt', '.0-0')  + ` (` + valor.representatividade + `)`])].slice(0, 10);
        if (this.myDataConsultor) {
          this.drawChart();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  drawChart() {
    const data = google.visualization.arrayToDataTable([
      ['Consultor', 'BaseCalculo', { role: 'annotation' }],
      ...this.myDataConsultor
    ]);

    const options = {
      title: 'Pago por Consultor',
      bars: 'horizontal',
      fontName: 'Open Sans',
      colors: ['#d9b300'],
      bar: { groupWidth: '70%' },
      legend: { position: 'none' },
      vAxis: {
        textStyle: {
          fontSize: 10,
          bold: true,
        },
        titleTextStyle: {
          color: "#000",
          fontName: 'Open Sans',
          fontSize: 11,
          bold: true,
          italic: false
        }
      },
      hAxis: {
        textStyle: {
          fontSize: 10
        },
        titleTextStyle: {
          color: "#000",
          fontName: 'Open Sans',
          fontSize: 13,
          bold: true,
          italic: false
        }
      },
      annotations: {
        alwaysOutside: true,
        textStyle: {
          color: "#000",
          fontSize: 10,
        }
      }
    };

    const view = new google.visualization.DataView(data);
    const chart = new google.visualization.BarChart(this.barChart.nativeElement);
    chart.draw(view, options);
  };
};
