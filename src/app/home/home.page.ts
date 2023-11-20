import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import {
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  barcodes: any[] | undefined;

  constructor(private navCtrl: NavController, private alertController: AlertController) {}

  volver() {
    this.navCtrl.navigateForward('/login');
  }

  async scan(): Promise<any[]> {
    const { barcodes } = await BarcodeScanner.scan({
      formats: [BarcodeFormat.QrCode],
    });
    this.showScanResultAlert();
    return barcodes;
  }

  async scanQRCode() {
    // Lógica para escanear el código QR y obtener los datos
    // Supongamos que los datos se almacenan en una variable llamada 'qrData'
    const qrData = "Datos del código QR escaneado: ";
    return qrData;
  }

  async showScanResultAlert() {
    // Llamamos a la función para escanear el código QR
  const qrData = await this.scanQRCode();

  // Creamos la alerta con los datos del código QR
  const alert = await this.alertController.create({
    header: 'Escaneo exitoso',
    message: `El código QR se ha escaneado correctamente. Datos: ${qrData}`,
    buttons: ['OK']
  });

  // Mostramos la alerta
  await alert.present();
}

  public async uwu(): Promise <void>{
    await BarcodeScanner.installGoogleBarcodeScannerModule();
  }
  
  }

