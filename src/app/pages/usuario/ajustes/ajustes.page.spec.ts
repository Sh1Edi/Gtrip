import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AjustesPage } from './ajustes.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';



describe('Ajustes', () => {
  let component: AjustesPage;
  let fixture: ComponentFixture<AjustesPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(AjustesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Pruebas unitarias', () => {
    expect(component).toBeTruthy();
  });
});
