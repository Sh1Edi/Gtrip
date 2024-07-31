import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarcontraPage } from './modificarcontra.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('Formulario de modificar contra', () => {
  let component: ModificarcontraPage;
  let fixture: ComponentFixture<ModificarcontraPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarcontraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Pruebas unitarias', () => {
    expect(component).toBeTruthy();
  });
});
