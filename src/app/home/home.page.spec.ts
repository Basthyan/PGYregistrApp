import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { By } from '@angular/platform-browser';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('click en el botón de escaneo muestra el código QR', async () => {
    spyOn(component, 'scan'); // Espía

    const button = fixture.debugElement.query(By.css('ion-button'));

    // Hace la simulación de un click en el botón
    button.triggerEventHandler('click', null);

    // Esperar a que se resuelva la promesa del método scan 
    await fixture.whenStable();

    // Verifica si el método scan haya sido llamado
    expect(component.scan).toHaveBeenCalled();
  });

});
