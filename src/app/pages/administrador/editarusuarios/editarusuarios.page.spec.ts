import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarusuariosPage } from './editarusuarios.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('Editar usuarios ', () => {
  let component: EditarusuariosPage;
  let fixture: ComponentFixture<EditarusuariosPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarusuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Pruebas unitarias', () => {
    expect(component).toBeTruthy();
  });
});
