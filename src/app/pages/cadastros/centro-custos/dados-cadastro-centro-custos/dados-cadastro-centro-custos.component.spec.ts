import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosCadastroCentroCustosComponent } from './dados-cadastro-centro-custos.component';

describe('DadosCadastroCentroCustosComponent', () => {
  let component: DadosCadastroCentroCustosComponent;
  let fixture: ComponentFixture<DadosCadastroCentroCustosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DadosCadastroCentroCustosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosCadastroCentroCustosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
