import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import {
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';
import { ActivatedRoute, Router,NavigationExtras } from "@angular/router";
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  barcodes: any[] | undefined;

  qrData: string | undefined;

  userHome: any;

  constructor(private navCtrl: NavController, private alertController: AlertController, private http: HttpClient, private activeroute: ActivatedRoute, private router: Router) {

    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.userHome = this.router.getCurrentNavigation()?.extras.state?.['user'];
        
      }
    });

  }

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

  
  async scanQRCode(){
    
    this.qrData = "Qr escaneado correctamente, presiona OK para continuar.";

    return this.qrData;


  }

  async showScanResultAlert() {
    // Llamamos a la función para escanear el código QR
  const qrData = await this.scanQRCode();
  // Creamos la alerta con los datos del código QR
  const alert = await this.alertController.create({
    header: 'Escaneo exitoso',
    message: `${qrData}`,
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          // Acción a realizar al presionar "Cancelar"
          console.log('Operación cancelada');
        }
      },
      {
        text: 'OK',
        handler: () => {
          this.router.navigate(['/marcar-asistencia']);
          console.log('Operación después de presionar OK');
          // Puedes llamar a otra función aquí o ejecutar código adicional
        }
      }
    ]
  });

  // Mostramos la alerta
  await alert.present();
}

  public async uwu(): Promise <void>{
    await BarcodeScanner.installGoogleBarcodeScannerModule();
  }

  
  }

