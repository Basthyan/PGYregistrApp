import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.page.html',
  styleUrls: ['./recuperacion.page.scss'],
})
export class RecuperacionPage implements OnInit {

  constructor(private navCtrl: NavController, private alertController: AlertController) { }

  async mostrarMensajeYRedirigir() {
    const alert = await this.alertController.create({
      header: '¡Mensaje enviado exitosamente!',
      message: 'Revisa tu correo electronico para recuperar tu contraseña.',
      buttons: ['OK'],
    });

    await alert.present();

    // Redirigir a otra página después de cerrar el mensaje
    alert.onDidDismiss().then(() => {
      this.navCtrl.navigateForward('/login');
    });
  }

  ngOnInit() {
  }

}
