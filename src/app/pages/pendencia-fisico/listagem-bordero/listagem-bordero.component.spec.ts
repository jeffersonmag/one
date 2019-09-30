import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemBorderoComponent } from './listagem-bordero.component';

describe('ListagemBorderoComponent', () => {
  let component: ListagemBorderoComponent;
  let fixture: ComponentFixture<ListagemBorderoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListagemBorderoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemBorderoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
