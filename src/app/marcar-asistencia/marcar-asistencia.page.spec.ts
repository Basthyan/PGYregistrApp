import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MarcarAsistenciaPage } from './marcar-asistencia.page';

describe('MarcarAsistenciaPage', () => {
  let component: MarcarAsistenciaPage;
  let fixture: ComponentFixture<MarcarAsistenciaPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({ 
      declarations: [MarcarAsistenciaPage],
    }).compileComponents();

    fixture = TestBed.createComponent(MarcarAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
