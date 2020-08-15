import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarEmpresaComponent } from './mostrar-empresa.component';

describe('MostrarEmpresaComponent', () => {
  let component: MostrarEmpresaComponent;
  let fixture: ComponentFixture<MostrarEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
