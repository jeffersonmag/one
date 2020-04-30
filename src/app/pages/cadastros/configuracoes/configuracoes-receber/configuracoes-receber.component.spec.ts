import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracoesReceberComponent } from './configuracoes-receber.component';

describe('ConfiguracoesReceberComponent', () => {
  let component: ConfiguracoesReceberComponent;
  let fixture: ComponentFixture<ConfiguracoesReceberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracoesReceberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracoesReceberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
