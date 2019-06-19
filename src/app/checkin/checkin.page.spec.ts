import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinPage } from './checkin.page';

describe('CheckinPage', () => {
  let component: CheckinPage;
  let fixture: ComponentFixture<CheckinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckinPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
