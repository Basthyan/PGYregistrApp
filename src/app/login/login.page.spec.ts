import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { LoginPage } from './login.page';
import { ApiService } from 'src/services/api.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { Router } from '@angular/router';

// Mock para ApiService
class ApiServiceMock {
  login(username: string, password: string) {
    // Simula la respuesta del servicio
    const usuarioMock = {
      id: 1,
      user: 'a',
      correo: 'at@a.com',
      nombre: 'a',
      tipoPerfil: 1,
    };

    return of({
      status: 200,
      body: usuarioMock,
    });
  }
}

// Mock para AuthGuard
class AuthGuardMock {
  setAuthenticationStatus(status: boolean) {
    // Simula la acción del AuthGuard
  }
}

// Mock para Router
class RouterMock {
  navigate = jasmine.createSpy('navigate');
}

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let apiService: ApiService;
  let authGuard: AuthGuard;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [ReactiveFormsModule, RouterTestingModule, MatSnackBarModule, MatDialogModule],
      providers: [
        { provide: ApiService, useClass: ApiServiceMock },
        { provide: AuthGuard, useClass: AuthGuardMock },
        { provide: Router, useClass: RouterMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    authGuard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ApiService login method on Login()', () => {
    const username = 'a';
    const password = 'a';

    component.usuario.setValue({ username, password, rememberMe: false });

    spyOn(apiService, 'login').and.returnValue(of({ status: 200, body: {} as any }));

    component.Login();

    expect(apiService.login).toHaveBeenCalledWith(username, password);
  });

  it('should navigate to /home-profesor if tipoPerfil is 1', () => {
    const navigationExtras = {
      state: {
        id: 1,
        user: 'a',
        correo: 'a@a.com',
        nombre: 'a',
        tipoPerfil: 1,
      },
    };

    const navigateSpy = spyOn(router, 'navigate');

    spyOn(apiService, 'login').and.returnValue(
      of({ status: 200, body: { tipoPerfil: 1 } })
    );

    component.Login();

    expect(authGuard.setAuthenticationStatus).toHaveBeenCalledWith(true);
    expect(navigateSpy).toHaveBeenCalledWith(['/home-profesor'], navigationExtras);
  });
});
