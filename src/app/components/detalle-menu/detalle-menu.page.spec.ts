import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleMenuPage } from './detalle-menu.page';

describe('DetalleMenuPage', () => {
  let component: DetalleMenuPage;
  let fixture: ComponentFixture<DetalleMenuPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
