import { formatNumber } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ApiService } from '../../../api/api.service';
declare var google: any;

@Component({
  selector: 'app-instituicao',
  templateUrl: './instituicao.component.html',
  styleUrls: ['./instituicao.component.scss']
})
export class InstituicaoComponent implements OnInit, AfterViewInit {
  @ViewChild('barChart') barChart!: ElementRef;

  public myDataInstituicao: Array<Array<any>> = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getInstituicao();
  }

  ngAfterViewInit(): void {
    google.charts.load('current', { packages: ['corechart', 'bar'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }

  getInstituicao() {
    this.apiService.getApelidoInstituicao()
      .then((s) => {
        this.myDataInstituicao = [...s.map((valor: any) => [valor.apelido_instituicao, valor.total_base_calculo, formatNumber(Number(valor.total_base_calculo), 'pt', '.0-0') + ` (` + valor.representatividade + `)`])].slice(0, 10);
        if (this.myDataInstituicao) {
          this.drawChart();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  drawChart() {
    const data = google.visualization.arrayToDataTable([
      ['Instituicao', 'BaseCalculo', { role: 'annotation' }],
      ...this.myDataInstituicao
    ]);

    const options = {
      title: 'Pago por instituição',
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
        color: '#000',
        textStyle: {
          color: "#000",
          fontSize: 11,
        }
      }
    };

    const view = new google.visualization.DataView(data);
    const chart = new google.visualization.BarChart(this.barChart.nativeElement);
    chart.draw(view, options);
  }
}
