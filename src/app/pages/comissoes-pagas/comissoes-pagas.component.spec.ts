import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComissoesPagasComponent } from './comissoes-pagas.component';

describe('ComissoesPagasComponent', () => {
  let component: ComissoesPagasComponent;
  let fixture: ComponentFixture<ComissoesPagasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComissoesPagasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComissoesPagasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
