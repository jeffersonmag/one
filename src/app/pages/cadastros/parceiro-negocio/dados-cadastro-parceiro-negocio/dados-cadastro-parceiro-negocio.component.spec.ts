import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosCadastroParceiroNegocioComponent } from './dados-cadastro-parceiro-negocio.component';

describe('DadosCadastroComponent', () => {
  let component: DadosCadastroParceiroNegocioComponent;
  let fixture: ComponentFixture<DadosCadastroParceiroNegocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DadosCadastroParceiroNegocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosCadastroParceiroNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
