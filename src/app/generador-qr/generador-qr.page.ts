import { Component, OnInit } from '@angular/core';
import { Curso } from '../modelo/curso';
import { Alumno } from '../modelo/alumno';
import { ApiService } from 'src/services/api.service';
import { ActivatedRoute, Router, Route } from '@angular/router';
import * as qrcode from 'qrcode-generator';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-generador-qr',
  templateUrl: './generador-qr.page.html',
  styleUrls: ['./generador-qr.page.scss'],
})
export class GeneradorQrPage implements OnInit {
  cursol: Curso | undefined;
  alumnosl: Alumno[] | undefined = [];
  profesorId: number = 1;
  cursoId: any;

  qrDataURL: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private activeroute: ActivatedRoute,
    private navCtrl: NavController
  ) {
    this.activeroute.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.profesorId =
          this.router.getCurrentNavigation()?.extras.state?.['idProfesor'];
        this.cursoId =
          this.router.getCurrentNavigation()?.extras.state?.['idCurso'];
      }
    });
  }

  generateQRCode() {
    if (this.cursol) {
      const fechaActual = new Date().toISOString();
      const data = `${this.cursol.codigo}-${this.cursol.seccion}-${fechaActual}`;

      let qr = qrcode(4, 'L');
      qr.addData(data);
      qr.make();
      this.qrDataURL = qr.createDataURL(4);
    }
  }

  ngOnInit() {
    this.apiService.obtenerCursosPorProfesor(this.profesorId).subscribe(
      (data) => {
        this.cursol = data.find((curso: Curso) => curso.id === this.cursoId);
        this.alumnosl = this.cursol ? this.cursol.alumnos : [];
        this.generateQRCode();
      },
      (error) => {
        console.error('Error obteniendo cursos:', error);
      }
    );
  }

  volver() {
    this.navCtrl.navigateForward('/home-profesor');
  }
}
