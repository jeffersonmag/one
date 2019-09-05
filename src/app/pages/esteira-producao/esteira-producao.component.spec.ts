import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsteiraProducaoComponent } from './esteira-producao.component';

describe('EsteiraProducaoComponent', () => {
  let component: EsteiraProducaoComponent;
  let fixture: ComponentFixture<EsteiraProducaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsteiraProducaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsteiraProducaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
