import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosCadastroProjetosComponent } from './dados-cadastro-projetos.component';

describe('DadosCadastroProjetosComponent', () => {
  let component: DadosCadastroProjetosComponent;
  let fixture: ComponentFixture<DadosCadastroProjetosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DadosCadastroProjetosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosCadastroProjetosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
