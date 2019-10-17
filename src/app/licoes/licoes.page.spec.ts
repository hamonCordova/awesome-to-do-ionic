import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicoesPage } from './licoes.page';

describe('LicoesPage', () => {
  let component: LicoesPage;
  let fixture: ComponentFixture<LicoesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicoesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
