import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/modelo/usuario';
import { Alumno } from 'src/app/modelo/alumno';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  url: string =
    'https://1g874hmc-5000.brs.devtunnels.ms/'; /* https://1g874hmc-5000.brs.devtunnels.ms/ */ /* http://127.0.0.1:5000/ */

  public login(
    usuario: string,
    pass: string
  ): Observable<HttpResponse<Usuario>> {
    const body = {
      user: usuario,
      password: pass,
    };

    return this.http.post<Usuario>(this.url + 'login', body, {
      ...this.httpOptions,
      observe: 'response',
    });
  }

  public obtenerCursosPorProfesor(profesorId: number): Observable<any> {
    return this.http.get<any>(
      this.url + 'profesores/' + profesorId + '/cursos',
      this.httpOptions
    );
  }

  public obtenerAlumnosPorCurso(
    profesorId: number,
    cursoId: number
  ): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(
      this.url + 'profesores/' + profesorId + '/cursos/' + cursoId + '/alumnos',
      this.httpOptions
    );
  }

  constructor(private http: HttpClient) {}
}
