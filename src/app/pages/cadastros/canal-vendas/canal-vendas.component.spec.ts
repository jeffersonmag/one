import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanalVendasComponent } from './canal-vendas.component';

describe('CanalVendasComponent', () => {
  let component: CanalVendasComponent;
  let fixture: ComponentFixture<CanalVendasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanalVendasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanalVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
