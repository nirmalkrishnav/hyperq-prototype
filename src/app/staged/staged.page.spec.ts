import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StagedPage } from './staged.page';

describe('StagedPage', () => {
  let component: StagedPage;
  let fixture: ComponentFixture<StagedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StagedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StagedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
