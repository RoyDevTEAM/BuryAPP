import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleBarPage } from './detalle-bar.page';

describe('DetalleBarPage', () => {
  let component: DetalleBarPage;
  let fixture: ComponentFixture<DetalleBarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleBarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
