import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.page.html',
  styleUrls: ['./recuperacion.page.scss'],
})
export class RecuperacionPage implements OnInit {

  recuperacionForm: FormGroup;

  constructor(private navCtrl: NavController, private alertController: AlertController) {
    this.recuperacionForm = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  async mostrarMensajeYRedirigir() {
    if (this.recuperacionForm.valid) {
      // Lógica para enviar el correo y redirigir
      const alert = await this.alertController.create({
        header: '¡Mensaje enviado exitosamente!',
        message: 'Revisa tu correo electrónico para recuperar tu contraseña.',
        buttons: ['OK'],
      });

      await alert.present();

      // Redirigir a otra página después de cerrar el mensaje
      alert.onDidDismiss().then(() => {
        this.navCtrl.navigateForward('/login');
      });
    } else {
      // Mostrar un mensaje de error si el formulario no es válido
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, ingresa un correo electrónico válido.',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }

  ngOnInit() {
  }

}

