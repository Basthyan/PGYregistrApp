import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RecuperacionPage } from './recuperacion.page';
import { NavController, AlertController } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

// Mock para NavController
class NavControllerMock {
  navigateForward = jasmine.createSpy('navigateForward');
}

// Mock para AlertController
class AlertControllerMock {
  create() {
    return Promise.resolve({
      present: () => Promise.resolve(),
      onDidDismiss: () => Promise.resolve(),
    });
  }
}

describe('RecuperacionPage', () => {
  let component: RecuperacionPage;
  let fixture: ComponentFixture<RecuperacionPage>;
  let navCtrl: NavController;
  let alertController: AlertController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecuperacionPage],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: NavController, useClass: NavControllerMock },
        { provide: AlertController, useClass: AlertControllerMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperacionPage);
    component = fixture.componentInstance;
    navCtrl = TestBed.inject(NavController);
    alertController = TestBed.inject(AlertController);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call mostrarMensajeYRedirigir method with valid form', async () => {
    const spyMostrarMensajeYRedirigir = spyOn(component, 'mostrarMensajeYRedirigir').and.callThrough();
    component.recuperacionForm.setValue({ correo: 'test@example.com' });

    await component.mostrarMensajeYRedirigir();

    expect(spyMostrarMensajeYRedirigir).toHaveBeenCalled();
    expect(navCtrl.navigateForward).toHaveBeenCalledWith('/login');
  });

  it('should show an error alert with invalid form', async () => {
    const spyMostrarMensajeYRedirigir = spyOn(component, 'mostrarMensajeYRedirigir').and.callThrough();
    const spyAlertControllerCreate = spyOn(alertController, 'create').and.callThrough();
    component.recuperacionForm.setValue({ correo: 'invalidEmail' });

    await component.mostrarMensajeYRedirigir();

    expect(spyMostrarMensajeYRedirigir).toHaveBeenCalled();
    expect(spyAlertControllerCreate).toHaveBeenCalledWith({
      header: 'Error',
      message: 'Por favor, ingresa un correo electrónico válido.',
      buttons: ['OK'],
    });
  });
});
