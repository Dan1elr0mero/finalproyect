import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { LoginResponse } from '../interfaces/login';
import { Usuario } from '../interfaces/usuarios';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });

    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users from API', () => {
    const mockLoginResponse: LoginResponse = {
      result: 'success',
      message: 'Login successful',
      data: {
        token: 'exampleToken123',
      },
    };

    const userCredentialsMock: Usuario = {
      _id: '1234567890',
      nombre: 'Usuario de ejemplo',
      nombreUsuario: 'ejemploUsuario',
      contrasenia: 'contraseña123',
      createdAt: '2022-04-16T12:00:00Z',
      updatedAt: '2022-04-16T12:00:00Z',
    };

    service.iniciarSesion(userCredentialsMock).subscribe((user) => {
      expect(user.result).toBe('success');
      expect(user).toEqual(mockLoginResponse);
    });

    const req = httpMock.expectOne('http://3.138.36.232:8080/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockLoginResponse);
  });
});
