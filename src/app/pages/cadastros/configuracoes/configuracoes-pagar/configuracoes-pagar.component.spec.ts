import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracoesPagarComponent } from './configuracoes-pagar.component';

describe('ConfiguracoesPagarComponent', () => {
  let component: ConfiguracoesPagarComponent;
  let fixture: ComponentFixture<ConfiguracoesPagarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracoesPagarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracoesPagarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
