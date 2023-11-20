import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private navCtrl: NavController, private barcodeScanner: BarcodeScanner) {}

  volver() {
    this.navCtrl.navigateForward('/login');
  }

  goToScanner() {
    this.navCtrl.navigateForward('/scanner');
  }

  scanQRCode(): void {
    this.barcodeScanner.scan().then((barcodeData) => {
      // Aquí puedes manejar la lógica después de escanear el código QR
      console.log('Código QR escaneado:', barcodeData.text);
    }).catch((error) => {
      console.error('Error al escanear código QR:', error);
    });
  }

}
