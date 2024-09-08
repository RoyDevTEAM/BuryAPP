import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformacionLegalPage } from './informacion-legal.page';

describe('InformacionLegalPage', () => {
  let component: InformacionLegalPage;
  let fixture: ComponentFixture<InformacionLegalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionLegalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
