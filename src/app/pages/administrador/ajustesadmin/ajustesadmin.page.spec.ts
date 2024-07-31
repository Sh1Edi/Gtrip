import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AjustesadminPage } from './ajustesadmin.page';

describe('Ajustes del admin', () => {
  let component: AjustesadminPage;
  let fixture: ComponentFixture<AjustesadminPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(AjustesadminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Pruebas unitarias', () => {
    expect(component).toBeTruthy();
  });
});
