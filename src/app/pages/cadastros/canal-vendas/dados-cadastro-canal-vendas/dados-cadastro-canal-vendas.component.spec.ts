import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosCadastroBancosComponent } from './dados-cadastro-bancos.component';

describe('DadosCadastroComponent', () => {
  let component: DadosCadastroBancosComponent;
  let fixture: ComponentFixture<DadosCadastroBancosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DadosCadastroBancosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosCadastroBancosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
