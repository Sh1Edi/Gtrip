import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConductoresPage } from './conductores.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('Vista de conductores-ADMIN', () => {
  let component: ConductoresPage;
  let fixture: ComponentFixture<ConductoresPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(ConductoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Pruebas unitarias', () => {
    expect(component).toBeTruthy();
  });
});
