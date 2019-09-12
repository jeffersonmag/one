import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolucaoInconsistenciasComponent } from './solucao-inconsistencias.component';

describe('SolucaoInconsistenciasComponent', () => {
  let component: SolucaoInconsistenciasComponent;
  let fixture: ComponentFixture<SolucaoInconsistenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolucaoInconsistenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolucaoInconsistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
