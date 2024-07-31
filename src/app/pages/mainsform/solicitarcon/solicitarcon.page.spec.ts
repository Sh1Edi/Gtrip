import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitarconPage } from './solicitarcon.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('Formulario de ser conductor', () => {
  let component: SolicitarconPage;
  let fixture: ComponentFixture<SolicitarconPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitarconPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Pruebas unitarias', () => {
    expect(component).toBeTruthy();
  });
});
