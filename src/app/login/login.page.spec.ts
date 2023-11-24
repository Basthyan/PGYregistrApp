import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { IonicModule } from '@ionic/angular';
import { MatSnackBar } from '@angular/material/snack-bar';


describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(),
        MatSnackBar]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should Make a Login Valid', () => {
    const fixture = TestBed.createComponent(LoginPage);
    const usuario = fixture.componentInstance;
    spyOn(usuario.snackBar, 'open'); // Espía sobre el método 'open' del servicio MatSnackBar
    fixture.detectChanges();
  
    // Simula la entrada del usuario
    usuario.usuario.get('username')?.setValue('juanPulgar');
    usuario.usuario.get('password')?.setValue('JuanP1');
  
    // Realiza el intento de inicio de sesión
    usuario.Login();
  
    // Verifica que el método 'open' del servicio MatSnackBar no se haya llamado
    expect(usuario.snackBar.open).not.toHaveBeenCalled();
  });

});
