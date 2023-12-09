import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { GeneradorQrPage } from './generador-qr.page';
import { ApiService } from 'src/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { of } from 'rxjs';

// Mock para ActivatedRoute
class ActivatedRouteMock {
  queryParams = of({ idProfesor: 1, idCurso: 1 });
}

// Mock para Router
class RouterMock {
  getCurrentNavigation() {
    return {
      extras: {
        state: { idProfesor: 1, idCurso: 1 },
      },
    };
  }
}

// Mock para ApiService
class ApiServiceMock {
  obtenerCursosPorProfesor(id: number) {
    const cursosMock = [
      {
        id: 123,
        codigo: 'ABC123',
        seccion: '001',
        alumnos: [{ }],
      }
    ];
    return of(cursosMock);
  }
}

describe('GeneradorQrPage', () => {
  let component: GeneradorQrPage;
  let fixture: ComponentFixture<GeneradorQrPage>;
  let apiService: ApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GeneradorQrPage],
      providers: [
        { provide: ApiService, useClass: ApiServiceMock },
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        { provide: Router, useClass: RouterMock },
        NavController,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneradorQrPage);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set values on ngOnInit', () => {
    spyOn(apiService, 'obtenerCursosPorProfesor').and.returnValue(of([]));

    component.ngOnInit();

    expect(component.profesorId).toBe(1);
    expect(component.cursoId).toBe(1);
    expect(component.qrDataURL).not.toBe('');
  });
});
