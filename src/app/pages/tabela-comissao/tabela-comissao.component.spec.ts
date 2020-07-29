import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaComissaoComponent } from './tabela-comissao.component';

describe('TabelaComissaoComponent', () => {
  let component: TabelaComissaoComponent;
  let fixture: ComponentFixture<TabelaComissaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaComissaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaComissaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
