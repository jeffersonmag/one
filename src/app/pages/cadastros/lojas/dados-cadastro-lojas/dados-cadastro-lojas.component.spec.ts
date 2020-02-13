import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosCadastroLojasComponent } from './dados-cadastro-lojas.component';

describe('DadosCadastroComponent', () => {
  let component: DadosCadastroLojasComponent;
  let fixture: ComponentFixture<DadosCadastroLojasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DadosCadastroLojasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosCadastroLojasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
