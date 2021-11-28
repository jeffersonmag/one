import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanalSuporteComponent } from './canal-suporte.component';

describe('CanalSuporteComponent', () => {
  let component: CanalSuporteComponent;
  let fixture: ComponentFixture<CanalSuporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanalSuporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanalSuporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
