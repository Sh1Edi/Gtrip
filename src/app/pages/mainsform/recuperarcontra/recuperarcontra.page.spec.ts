import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarcontraPage } from './recuperarcontra.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('Recuperar contraseña', () => {
  let component: RecuperarcontraPage;
  let fixture: ComponentFixture<RecuperarcontraPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [SQLite, {provide: ActivatedRoute,useValue: {queryParams: of(convertToParamMap({ search: ""}))}}]
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarcontraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Pruebas unitarias', () => {
    expect(component).toBeTruthy();
  });
});
