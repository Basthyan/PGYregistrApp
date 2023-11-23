import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-marcar-asistencia',
  templateUrl: './marcar-asistencia.page.html',
  styleUrls: ['./marcar-asistencia.page.scss'],
})
export class MarcarAsistenciaPage implements OnInit {

  barcodes: any[] = [];
  
  public datos= {
    sigla: "",
    seccion: "",
    fecha: "",
    hora: ""
  }

  constructor(private navCtrl: NavController, private route: ActivatedRoute) { 

    this.route.queryParams.subscribe((params) => {
      if (params && params['state']) {
        this.barcodes = params['state'].barcodes;
        this.datos.sigla = this.barcodes[0];
        this.datos.seccion = this.barcodes[1];
        this.datos.fecha = this.barcodes[2];
        this.datos.hora = this.barcodes[3];
      }
    });
    
  }

  abrirCorreo() {
    // Dirección de correo electrónico y otros parámetros opcionales
    let destinatario = 'profesor@duocuc.cl';
    let asunto = 'Marcaje de asistencia';
    let cuerpo = 'Cuerpo del correo';

    // Construir el enlace de correo electrónico con la sintaxis "mailto"
    let mailtoLink = `mailto:${destinatario}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;

    // Abrir la aplicación de correo electrónico predeterminada del usuario
    window.location.href = mailtoLink;
  }

  volver() {
    this.navCtrl.navigateForward('/home');
  }

  ngOnInit() {
  }

}
