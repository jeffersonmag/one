import { Component, Input } from '@angular/core';

@Component({
  selector: 'status',
  styleUrls: ['./status.component.scss'],
  template: `
    <!--<nb-card (click)="on = !on" [ngClass]="{'off': !on}">-->
    <nb-card>
      <div class="icon-container">
        <div class="icon status-{{ type }}">
          <ng-content></ng-content>
        </div>
      </div>
      <div class="details">
        <div class="title">{{ title }}</div>
        <div class="title">CPF/CNPJ: {{ dados }}</div>
      </div>
    </nb-card>
  `,
})
export class StatusComponent {
  @Input() title: string;
  @Input() dados: string;
  @Input() type: string;
  @Input() on: boolean = true;
}
