import { Alumno } from './alumno';

export class Curso {
  id: number | undefined;
  nombre: string | undefined;
  codigo: string | undefined;
  alumnos?: Alumno[] | undefined;
}
