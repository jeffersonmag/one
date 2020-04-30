import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuitarParcelaComponent } from './quitar-parcela.component';

describe('QuitarParcelaComponent', () => {
  let component: QuitarParcelaComponent;
  let fixture: ComponentFixture<QuitarParcelaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuitarParcelaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuitarParcelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
