import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'progressbar-modal-comp',
  template: `
    <div id="ac90819em1" class="modal-header">
      <h4 id="ac90819h41" class="modal-title">A sessão será encerrada</h4>
    </div>
    <div id="ac90819di1" class="modal-body">
      O tempo limite será atingido em {{(countMinutes !== 0 ? + countMinutes+' Minutos'+(countMinutes > 1 ? 's ' : ' ') : '') + countSeconds+' Segundos'}}
      <!--<p>
        <nb-progress-bar type="danger" [value]="progressCount" animate="false" id="ac90819ou1"
                         class="progress-striped active">
        </nb-progress-bar>
      </p>-->
    </div>
    <div id="ac90819di2" class="modal-footer">
      <button type="button" id="ac90819bu1" class="btn btn-primary" (click)="continue()">Permanecer na sessão</button>
      <button type="button" id="ac90819bu2" class="btn btn-primary" (click)="logout()">Fazer Logoff</button>
    </div>
  `
})
export class ProgressBarModalComponent {

  @Input() countMinutes: number;
  @Input() countSeconds: number;
  @Input() progressCount: number;

  constructor(public activeModal: NgbActiveModal) {
  }
  continue() {
    this.activeModal.close('continue');
  }
  logout() {
    this.activeModal.close('logout');
  }
}

