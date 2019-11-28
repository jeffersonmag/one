import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosCadastroComponent } from './dados-cadastro.component';

describe('DadosCadastroComponent', () => {
  let component: DadosCadastroComponent;
  let fixture: ComponentFixture<DadosCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DadosCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
