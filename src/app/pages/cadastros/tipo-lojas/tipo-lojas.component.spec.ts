import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoLojaComponent } from './tipo-lojas.component';

describe('BancosComponent', () => {
  let component: TipoLojaComponent;
  let fixture: ComponentFixture<TipoLojaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoLojaComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoLojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
