import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenupusuarioPage } from './menupusuario.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('Menu principal de la app', () => {
  let component: MenupusuarioPage;
  let fixture: ComponentFixture<MenupusuarioPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [SQLite, {provide: ActivatedRoute,useValue: {queryParams: of(convertToParamMap({ search: ""}))}}],
      imports : [HttpClientModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MenupusuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Pruebas unitarias', () => {
    expect(component).toBeTruthy();
  });
});
