import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapPage } from './map.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('Mapa-Geolocalizacion', () => {
  let component: MapPage;
  let fixture: ComponentFixture<MapPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(MapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Pruebas unitarias', () => {
    expect(component).toBeTruthy();
  });
});
