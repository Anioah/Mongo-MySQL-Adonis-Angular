import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarCompanyComponent } from './mostrar-company.component';

describe('MostrarCompanyComponent', () => {
  let component: MostrarCompanyComponent;
  let fixture: ComponentFixture<MostrarCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
