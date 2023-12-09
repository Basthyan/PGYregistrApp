import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import {
  BarcodeScanner,
  BarcodeFormat
} from '@capacitor-mlkit/barcode-scanning';
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
      message: 'Presiona OK para continuar con el marcaje de asistencia...',
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
            console.log('Datos del código QR:', this.barcodes);
            this.router.navigate(['/marcar-asistencia'], {state: {barcodes: this.barcodes}});
          },
        },
      ],
    });
    await alert.present();
  }

  public async uwu(): Promise<void> {
    await BarcodeScanner.installGoogleBarcodeScannerModule();
  }

  volver() {
    this.navCtrl.navigateForward('/login');
  }
}