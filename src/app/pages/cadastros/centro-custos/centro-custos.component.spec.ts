import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroCustosComponent } from './centro-custos.component';

describe('CentroCustosComponent', () => {
  let component: CentroCustosComponent;
  let fixture: ComponentFixture<CentroCustosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentroCustosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentroCustosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
