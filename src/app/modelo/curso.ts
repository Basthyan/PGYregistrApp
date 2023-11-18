import { Alumno } from './alumno';

export class Curso {
  id: number | undefined;
  nombre: string | undefined;
  codigo: string | undefined;
  seccion: string | undefined;
  alumnos?: Alumno[] | undefined;
}
