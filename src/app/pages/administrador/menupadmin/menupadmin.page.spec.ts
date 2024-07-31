import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenupadminPage } from './menupadmin.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('Menu principal ADMIN', () => {
  let component: MenupadminPage;
  let fixture: ComponentFixture<MenupadminPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers : [SQLite, HttpClient, HttpHandler]
    }).compileComponents();

    fixture = TestBed.createComponent(MenupadminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Pruebas unitarias', () => {
    expect(component).toBeTruthy();
  });
});
