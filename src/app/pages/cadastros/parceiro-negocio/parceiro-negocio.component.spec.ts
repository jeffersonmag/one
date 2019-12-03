import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParceiroNegocioComponent } from './parceiro-negocio.component';

describe('ParceiroNegocioComponent', () => {
  let component: ParceiroNegocioComponent;
  let fixture: ComponentFixture<ParceiroNegocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParceiroNegocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParceiroNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
