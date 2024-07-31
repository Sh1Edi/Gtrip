import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EliminarbloquearPage } from './eliminarbloquear.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('Eliminar o bloquear cuentas', () => {
  let component: EliminarbloquearPage;
  let fixture: ComponentFixture<EliminarbloquearPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(EliminarbloquearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Pruebas unitarias', () => {
    expect(component).toBeTruthy();
  });
});
