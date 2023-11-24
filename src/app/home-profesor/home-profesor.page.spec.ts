import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomeProfesorPage } from './home-profesor.page';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

describe('HomePageProfesor', () => {
  let component: HomeProfesorPage;
  let fixture: ComponentFixture<HomeProfesorPage>;
  let router: Router;
  let navCtrl: NavController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomeProfesorPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: Router, useValue: {} },
        { provide: NavController, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeProfesorPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    navCtrl = TestBed.inject(NavController);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to generador-qr when verDetalleCurso is called', () => {
    const cursoId = 1;
    spyOn(router, 'navigate').and.stub();

    component.verDetalleCurso(cursoId);

    expect(router.navigate).toHaveBeenCalledWith(['/generador-qr'], {
      state: {
        idProfesor: component.idProfesor,
        idCurso: cursoId,
      },
    });
  });

  it('should navigate to /login when volver is called', () => {
    spyOn(navCtrl, 'navigateForward').and.stub();

    component.volver();

    expect(navCtrl.navigateForward).toHaveBeenCalledWith('/login');
  });
});

