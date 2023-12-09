import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HomeProfesorPage } from './home-profesor.page';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { NavController } from '@ionic/angular';
import { of } from 'rxjs';

// Mock para ActivatedRoute
class ActivatedRouteMock {
  queryParams = of({ user: 'testUser', id: 1 }); 
}

// Mock para Router
class RouterMock {
  getCurrentNavigation() {
    return {
      extras: {
        state: { user: 'testUser', id: 1 }
      },
    };
  }
  navigate = jasmine.createSpy('navigate');
}

// Mock para ApiService
class ApiServiceMock {
  obtenerCursosPorProfesor(id: number) {
    // Simula la respuesta del servicio
    const cursosMock = [
      { id: 1, nombre: 'Curso 1' },
      { id: 2, nombre: 'Curso 2' }
    ];
    return of(cursosMock);
  }
}

// Mock para NavController
class NavControllerMock {
  navigateForward = jasmine.createSpy('navigateForward');
}

describe('HomeProfesorPage', () => {
  let component: HomeProfesorPage;
  let fixture: ComponentFixture<HomeProfesorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeProfesorPage],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        { provide: Router, useClass: RouterMock },
        { provide: ApiService, useClass: ApiServiceMock },
        NavController,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProfesorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /generador-qr when verDetalleCurso is called', () => {
    const cursoId = 1;
    component.verDetalleCurso(cursoId);
    expect(component.router.navigate).toHaveBeenCalledWith(['/generador-qr'], {
      state: { idProfesor: component.idProfesor, idCurso: cursoId },
    });
  });
});
