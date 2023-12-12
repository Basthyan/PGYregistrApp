import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  barcodes: any[] = [];
  userHome: any;

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private http: HttpClient,
    private activeroute: ActivatedRoute,
    public router: Router
  ) {
    this.activeroute.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.userHome =
          this.router.getCurrentNavigation()?.extras.state?.['user'];
      }
    });
  }

  async scan(): Promise<void> {
    const { barcodes } = await BarcodeScanner.scan({
      formats: [BarcodeFormat.QrCode],
    });
    this.barcodes = barcodes;
    this.showScanResultAlert();
  }

  async showScanResultAlert() {
    const alert = await this.alertController.create({
      header: 'Escaneo exitoso',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Operación cancelada');
          },
        },
        {
          text: 'OK',
          handler: () => {
            this.abrirCorreo();
          },
        },
      ],
    });
    await alert.present();
  }

  abrirCorreo() {
    let destinatario = 'profesor@duocuc.cl';
    let asunto = 'Asistencia';
    let cuerpo = `Datos del código QR: ${JSON.stringify(this.barcodes)}`;

    // Construir el enlace de correo electrónico con la sintaxis "mailto"
    let mailtoLink = `mailto:${destinatario}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;

    // Abrir la aplicación de correo electrónico predeterminada del usuario
    window.location.href = mailtoLink;
  }

  public async uwu(): Promise<void> {
    await BarcodeScanner.installGoogleBarcodeScannerModule();
  }

  volver() {
    this.navCtrl.navigateForward('/login');
  }
}
