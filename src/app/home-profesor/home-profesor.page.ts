import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { ApiService } from 'src/services/api.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home-profesor',
  templateUrl: './home-profesor.page.html',
  styleUrls: ['./home-profesor.page.scss'],
})

export class HomeProfesorPage implements OnInit {

  userHome: any;
  pass: any;
  idProfesor : any;

  cursos: any[] = [];

  constructor(private activeroute: ActivatedRoute, private router: Router, private apiService : ApiService, private navCtrl: NavController) {
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.userHome = this.router.getCurrentNavigation()?.extras.state?.['user'];
        this.idProfesor = this.router.getCurrentNavigation()?.extras.state?.['id'];
        
      }
    });

   }

   verDetalleCurso(cursoId: number) {
    let setData: NavigationExtras = {
      state: {
        idProfesor: this.idProfesor,
        idCurso : cursoId        
      }
    };
    this.router.navigate(['/generador-qr'],setData);
}

volver() {
  this.navCtrl.navigateForward('/login');
}

ngOnInit() {
  this.apiService.obtenerCursosPorProfesor(this.idProfesor).subscribe(data => {
    this.cursos = data;
    console.log(this.cursos);
  });
}

}
