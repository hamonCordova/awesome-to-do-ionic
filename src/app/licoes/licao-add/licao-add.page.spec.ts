import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicaoAddPage } from './licao-add.page';

describe('LicaoAddPage', () => {
  let component: LicaoAddPage;
  let fixture: ComponentFixture<LicaoAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicaoAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicaoAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
