import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import {
  AlertController,
  Animation,
  AnimationController,
} from '@ionic/angular';
import type { QueryList } from '@angular/core';
import { Usuario } from '../modelo/usuario';
import { Perfil } from '../modelo/perfil';
import { Curso } from '../modelo/curso';
import { AuthGuard } from 'src/guard/auth.guard';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private router: Router,
    private animationCtrl: AnimationController,
    private auth: AuthGuard,
    private api: ApiService,
    private alertController: AlertController
  ) {}

  private typeuser!: Usuario;

  textBtn = 'INGRESAR';
  textUser = 'Usuario';
  textPass = 'Contraseña';
  desUser = 'ingrese usuario';
  desPass = 'ingrese contraseña';

  // user={
  //   apellido:"Ejemplo ngmodel"
  // }

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
  });

  Login() {
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
        }
      );
  }

  ngOnInit() {}
}
