import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosCadastroTipoCcComponent } from './dados-cadastro-tipo-cc.component';

describe('DadosCadastroTipoCcComponent', () => {
  let component: DadosCadastroTipoCcComponent;
  let fixture: ComponentFixture<DadosCadastroTipoCcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DadosCadastroTipoCcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosCadastroTipoCcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
