import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosCadastroTipoLojasComponent } from './dados-cadastro-tipo-lojas.component';

describe('DadosCadastroComponent', () => {
  let component: DadosCadastroTipoLojasComponent;
  let fixture: ComponentFixture<DadosCadastroTipoLojasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DadosCadastroTipoLojasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosCadastroTipoLojasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
