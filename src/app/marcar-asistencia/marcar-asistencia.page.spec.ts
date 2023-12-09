import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MarcarAsistenciaPage } from './marcar-asistencia.page';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

// Mock para NavController
class NavControllerMock {
  navigateForward = jasmine.createSpy('navigateForward');
}

// Mock para ActivatedRoute
class ActivatedRouteMock {
  queryParams = of({
    state: {
      barcodes: ['sigla', 'seccion', 'fecha', 'hora'],
    },
  }); // ajusta los valores según tus necesidades
}

describe('MarcarAsistenciaPage', () => {
  let component: MarcarAsistenciaPage;
  let fixture: ComponentFixture<MarcarAsistenciaPage>;
  let navCtrl: NavController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MarcarAsistenciaPage],
      providers: [
        { provide: NavController, useClass: NavControllerMock },
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcarAsistenciaPage);
    component = fixture.componentInstance;
    navCtrl = TestBed.inject(NavController);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set datos from queryParams', () => {
    expect(component.barcodes).toEqual(['sigla', 'seccion', 'fecha', 'hora']);
    expect(component.datos.sigla).toBe('sigla');
    expect(component.datos.seccion).toBe('seccion');
    expect(component.datos.fecha).toBe('fecha');
    expect(component.datos.hora).toBe('hora');
  });

  it('should navigate to /home on volver()', () => {
    component.volver();
    expect(navCtrl.navigateForward).toHaveBeenCalledWith('/home');
  });

  it('should open email client on abrirCorreo()', () => {
    spyOn(window, 'location').and.stub();
    component.abrirCorreo();
    expect(window.location.href).toHaveBeenCalled();
  });

  // Add more tests as needed
});
