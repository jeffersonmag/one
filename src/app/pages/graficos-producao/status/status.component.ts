import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../../../api/api.service';
declare var google: any;

const ANDAMENTO = 'ANDAMENTO';
const CANCELADO = 'CANCELADO';
const DIGITADO = 'DIGITADO';
const PAGO = 'PAGO';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit, AfterViewInit {
  @ViewChild('lineChart') lineChart!: ElementRef;

  public myDataStatus: Array<Array<any>> = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getStatus();
  }

  ngAfterViewInit(): void {
    google.charts.load('current', { packages: ['corechart', 'line'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }

  getStatus() {
    this.apiService.getStatus()
      .then((s) => {
        if (s) {
          this.myDataStatus = [];
          this.myDataStatus.push(['DATA', ANDAMENTO, CANCELADO, DIGITADO, PAGO])
          let dia: any = null;
          let vl_andamento: any = null;
          let vl_cancelado: any = null;
          let vl_digitado: any = null;
          let vl_pago: any = null;
          s.forEach((v: any) => {
            if (v.data == dia) {
              if (v.status_agrupado == ANDAMENTO) {
                vl_andamento = v.status_agrupado == ANDAMENTO ? v.total_base_calculo : 0;
              }
              if (v.status_agrupado == CANCELADO) {
                vl_cancelado = v.status_agrupado == CANCELADO ? v.total_base_calculo : 0;
              }
              if (v.status_agrupado == DIGITADO) {
                vl_digitado = v.status_agrupado == DIGITADO ? v.total_base_calculo : 0;
              }
              if (v.status_agrupado == PAGO) {
                vl_pago = v.status_agrupado == PAGO ? v.total_base_calculo : 0;
              }
            } else {
              dia = v.data
              vl_andamento = null;
              vl_cancelado = null;
              vl_digitado = null;
              vl_pago = null;
              if (v.status_agrupado == ANDAMENTO) {
                vl_andamento = v.status_agrupado == ANDAMENTO ? v.total_base_calculo : 0;
              }
              if (v.status_agrupado == CANCELADO) {
                vl_cancelado = v.status_agrupado == CANCELADO ? v.total_base_calculo : 0;
              }
              if (v.status_agrupado == DIGITADO) {
                vl_digitado = v.status_agrupado == DIGITADO ? v.total_base_calculo : 0;
              }
              if (v.status_agrupado == PAGO) {
                vl_pago = v.status_agrupado == PAGO ? v.total_base_calculo : 0;
              }
            }
            if (vl_andamento && vl_cancelado && vl_digitado && vl_pago)
              this.myDataStatus.push([dia, vl_andamento, vl_cancelado, vl_digitado, vl_pago]);
          })
        }

        if (this.myDataStatus) {
          this.drawChart();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  drawChart() {
    const data = google.visualization.arrayToDataTable([
      ...this.myDataStatus
    ]);

    const options = {
      title: 'Status da Operação',
      curveType: 'function',
      fontName: 'Open Sans',
      colors: ['#ffff00', '#FF0000', '#0000ff', '#009000'],
      legend: {
        position: 'bottom',
        textStyle: {
          fontSize: 9,
          bold: false,
        },
      },
      vAxis: {
        title: 'Valor Digitado',
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
        title: 'Data',
        textStyle: {
          fontSize: 7
        },
        titleTextStyle: {
          color: "#000",
          fontName: 'Open Sans',
          fontSize: 10,
          bold: true,
          italic: false
        }
      }
    };

    const view = new google.visualization.DataView(data);
    const chart = new google.visualization.LineChart(this.lineChart.nativeElement);
    chart.draw(view, options);
  };

}
