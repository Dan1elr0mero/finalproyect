export interface ResponseapiUser {
  result: string;
  message: string;
  data: User[];
}

export interface User {
  _id: string;
  nombre: string;
  nombreUsuario: string;
  contrasenia: string;
  createdAt?: Date;
  updatedAt?: Date;
}
