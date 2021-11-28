import { formatNumber } from '@angular/common';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../../../api/api.service';
declare var google: any;

@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.scss']
})
export class LojaComponent implements OnInit, AfterViewInit {
  @ViewChild('barChart') barChart!: ElementRef;

  public myDataLoja: Array<Array<any>> = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getLoja();
  }

  ngAfterViewInit(): void {
    google.charts.load('current', { packages: ['corechart', 'bar'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }

  getLoja() {
    this.apiService.getLoja()
      .then((s) => {
        this.myDataLoja = [...s.map((valor: any) => [valor.nome_loja, valor.total_base_calculo, formatNumber(Number(valor.total_base_calculo), 'pt', '.0-0') + ` (` + valor.representatividade + `)`])].slice(0, 10);
        if (this.myDataLoja) {
          this.drawChart();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  drawChart() {
    const data = google.visualization.arrayToDataTable([
      ['Loja', 'BaseCalculo', { role: 'annotation' }],
      ...this.myDataLoja
    ]);

    const options = {
      title: 'Pago por Unidade',
      bars: 'horizontal',
      fontName: 'Open Sans',
      colors: ['#d9b300'],
      bar: { groupWidth: '70%' },
      legend: { position: 'none' },
      vAxis: {
        textStyle: {
          fontSize: 9,
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
          fontName: 'Open Sans'
        }
      }
    };

    const view = new google.visualization.DataView(data);
    const chart = new google.visualization.BarChart(this.barChart.nativeElement);
    chart.draw(view, options);
  };
};
