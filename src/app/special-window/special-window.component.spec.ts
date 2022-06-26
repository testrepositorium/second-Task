import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialWindowComponent } from './special-window.component';

describe('SpecialWindowComponent', () => {
  let component: SpecialWindowComponent;
  let fixture: ComponentFixture<SpecialWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
