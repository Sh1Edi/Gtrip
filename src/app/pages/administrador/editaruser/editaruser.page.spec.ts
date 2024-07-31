import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditaruserPage } from './editaruser.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('Editar usuarios ', () => {
  let component: EditaruserPage;
  let fixture: ComponentFixture<EditaruserPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [SQLite, {provide: ActivatedRoute,useValue: {queryParams: of(convertToParamMap({ search: ""}))}}],
    }).compileComponents();

    fixture = TestBed.createComponent(EditaruserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Pruebas unitarias', () => {
    expect(component).toBeTruthy();
  });
});
