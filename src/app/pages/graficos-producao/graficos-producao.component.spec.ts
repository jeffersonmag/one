import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficosProducaoComponent } from './graficos-producao.component';

describe('GraficosProducaoComponent', () => {
  let component: GraficosProducaoComponent;
  let fixture: ComponentFixture<GraficosProducaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficosProducaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficosProducaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
