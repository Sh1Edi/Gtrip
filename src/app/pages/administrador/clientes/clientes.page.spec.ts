import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientesPage } from './clientes.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('Vistas de clientes-ADMIN', () => {
  let component: ClientesPage;
  let fixture: ComponentFixture<ClientesPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Pruebas unitarias', () => {
    expect(component).toBeTruthy();
  });
});
