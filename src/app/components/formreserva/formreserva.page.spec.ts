import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormreservaPage } from './formreserva.page';

describe('FormreservaPage', () => {
  let component: FormreservaPage;
  let fixture: ComponentFixture<FormreservaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormreservaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
