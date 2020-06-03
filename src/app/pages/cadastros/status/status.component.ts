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
        <div *ngIf="title !== null" class="title">{{ title }}</div>
        <div *ngIf="razao_social !== null" class="title">{{ razao_social }}</div>
        <div *ngIf="dados !== null" class="title">{{ dados }}</div>
        <div *ngIf="id !== null" class="title">{{ id }}</div>
      </div>
    </nb-card>
  `,
})
export class StatusComponent {
  @Input() title: string;
  @Input() dados: string;
  @Input() id: string;
  @Input() type: string;
  @Input() razao_social: string;
  @Input() on: boolean = true;
}
