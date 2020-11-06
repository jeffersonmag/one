import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProducaoComponent } from './dashboard-producao.component';

describe('DashboardProducaoComponent', () => {
  let component: DashboardProducaoComponent;
  let fixture: ComponentFixture<DashboardProducaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardProducaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardProducaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
