import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoContaCorrenteComponent } from './tipo-conta-corrente.component';

describe('TipoContaCorrenteComponent', () => {
  let component: TipoContaCorrenteComponent;
  let fixture: ComponentFixture<TipoContaCorrenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoContaCorrenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoContaCorrenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
