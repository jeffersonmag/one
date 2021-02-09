import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComissoesPagasDetalhesComponent } from './comissoes-pagas-detalhes.component';

describe('ComissoesPagasDetalhesComponent', () => {
  let component: ComissoesPagasDetalhesComponent;
  let fixture: ComponentFixture<ComissoesPagasDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComissoesPagasDetalhesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComissoesPagasDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
