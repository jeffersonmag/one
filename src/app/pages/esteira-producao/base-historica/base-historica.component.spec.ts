import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseHistoricaComponent } from './base-historica.component';

describe('BaseHistoricaComponent', () => {
  let component: BaseHistoricaComponent;
  let fixture: ComponentFixture<BaseHistoricaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseHistoricaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseHistoricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
