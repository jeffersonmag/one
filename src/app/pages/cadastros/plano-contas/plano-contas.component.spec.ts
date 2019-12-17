import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoContasComponent } from './plano-contas.component';

describe('PlanoContasComponent', () => {
  let component: PlanoContasComponent;
  let fixture: ComponentFixture<PlanoContasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanoContasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoContasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
