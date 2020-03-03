import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarParcelasComponent } from './adicionar-parcelas.component';

describe('AdicionarParcelasComponent', () => {
  let component: AdicionarParcelasComponent;
  let fixture: ComponentFixture<AdicionarParcelasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionarParcelasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarParcelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
