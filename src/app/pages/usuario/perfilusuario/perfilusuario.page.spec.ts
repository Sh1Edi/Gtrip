import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilusuarioPage } from './perfilusuario.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('Perfil del usuario', () => {
  let component: PerfilusuarioPage;
  let fixture: ComponentFixture<PerfilusuarioPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilusuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Pruebas unitarias', () => {
    expect(component).toBeTruthy();
  });
});
