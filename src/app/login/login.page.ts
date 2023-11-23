import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, Animation, AnimationController,} from '@ionic/angular';
import type { QueryList } from '@angular/core';
import { Usuario } from '../modelo/usuario';
import { Perfil } from '../modelo/perfil';
import { Curso } from '../modelo/curso';
import { AuthGuard } from 'src/guard/auth.guard';
import { ApiService } from 'src/services/api.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showSpinner: boolean = false;
  constructor(
    private router: Router,
    private animationCtrl: AnimationController,
    private auth: AuthGuard,
    private api: ApiService,
    private alertController: AlertController,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  private typeuser!: Usuario;
  private typePerfil!: Perfil;
  private curso!: Curso;

  enProceso: boolean = false;

  usuario = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
    rememberMe: new FormControl(false),
  });

  Login() {
    console.log('Datos del formulario:', this.usuario.value);

    if (this.usuario.value.rememberMe) {
      localStorage.setItem('rememberMe', this.usuario.value.rememberMe.toString());
    } else {
      localStorage.removeItem('rememberMe');
    }

    //Devuelve true en la carga del sipnner
    this.showSpinner = true;

    this.api
      .login(this.usuario.value.username!, this.usuario.value.password!)
      .subscribe(
        (response) => {
          this.typeuser = response.body as unknown as Usuario;
          console.log('estado:' + response.status);
          if (response.status == 200) {
            let setData: NavigationExtras = {
              state: {
                id: this.typeuser.id,
                user: this.typeuser.user,
                correo: this.typeuser.correo,
                nombre: this.typeuser.nombre,
                tipoPerfil: this.typeuser.tipoPerfil,
              },
            };

            console.log('estado:' + this.typeuser.tipoPerfil);

            if (this.typeuser.tipoPerfil === 1) {
              this.auth.setAuthenticationStatus(true);
              this.router.navigate(['/home-profesor'], setData);
            }

            if (this.typeuser.tipoPerfil === 2) {
              this.auth.setAuthenticationStatus(true);
              this.router.navigate(['/home'], setData);
            }
          }
        },
        (error) => {
          console.error('Error en inicio de sesión:', error);
          this.mostrarMensajeError(
            'Datos incorrectos. Por favor, inténtalo de nuevo.'
          );
        },
        () => {
          this.showSpinner = false; //termino del inicio de sesion
        }
      );
  }

  mostrarMensajeError(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 5000, // duración en milisegundos
      panelClass: ['mat-toolbar', 'mat-warn'], // clase CSS personalizada para el snackbar
    });
  }

  ngOnInit() {
    const rememberMe = localStorage.getItem('rememberMe');
    if (rememberMe !== null) {
      this.usuario.patchValue({ rememberMe: rememberMe === 'true' });
    }
  }
}

