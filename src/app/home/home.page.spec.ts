import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HomePage } from './home.page';
import { NavController, AlertController, Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BarcodeScanner,
  BarcodeScannerResult,
} from '@capacitor-mlkit/barcode-scanning';
import { of } from 'rxjs';

// Mock para NavController
class NavControllerMock {
  navigateForward = jasmine.createSpy('navigateForward');
}

// Mock para AlertController
class AlertControllerMock {
  create = jasmine.createSpy('create').and.returnValue(Promise.resolve());
}

// Mock para ActivatedRoute
class ActivatedRouteMock {
  queryParams = of({ user: 'testUser' }); // ajusta los valores según tus necesidades
}

// Mock para Router
class RouterMock {
  getCurrentNavigation() {
    return {
      extras: {
        state: { user: 'testUser' }, // ajusta los valores según tus necesidades
      },
    };
  }
  navigate = jasmine.createSpy('navigate');
}

// Mock para BarcodeScanner
class BarcodeScannerMock {
  scan(options: any): Promise<{ barcodes: BarcodeScannerResult[] }> {
    // Simula la respuesta del escaneo
    const barcodeResult: BarcodeScannerResult = {
      format: 'QR_CODE',
      data: 'testQRCodeData',
      cancelled: false,
    };
    return Promise.resolve({ barcodes: [barcodeResult] });
  }

  installGoogleBarcodeScannerModule(): Promise<void> {
    return Promise.resolve();
  }
}

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      providers: [
        { provide: NavController, useClass: NavControllerMock },
        { provide: AlertController, useClass: AlertControllerMock },
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        { provide: Router, useClass: RouterMock },
        { provide: BarcodeScanner, useClass: BarcodeScannerMock },
        Platform,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should scan and navigate to /marcar-asistencia', async () => {
    spyOn(component, 'showScanResultAlert').and.returnValue(Promise.resolve());

    await component.scan();

    expect(component.barcodes.length).toBe(1);
    expect(component.showScanResultAlert).toHaveBeenCalled();
    expect(component.router.navigate).toHaveBeenCalledWith(
      ['/marcar-asistencia'],
      { state: { barcodes: component.barcodes } }
    );
  });

  // Agrega más pruebas según sea necesario
});
