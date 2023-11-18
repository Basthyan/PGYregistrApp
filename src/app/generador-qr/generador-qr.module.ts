import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GeneradorQrPageRoutingModule } from './generador-qr-routing.module';
import { GeneradorQrPage } from './generador-qr.page';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneradorQrPageRoutingModule,
    MatToolbarModule
  ],
  declarations: [GeneradorQrPage]
})
export class GeneradorQrPageModule {}
