import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CreateUserService } from './create-user.service';
import { ResponseapiUser, User } from '../interfaces/apiResponse';

describe('CreateUserService', () => {
  let service: CreateUserService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(CreateUserService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should fetch users from API', () => {
    const mockUsers: ResponseapiUser = {
      result: 'test',
      message: 'test',
      data: [
        {
          _id: 'test',
          nombre: 'test',
          nombreUsuario: 'test',
          contrasenia: 'test',
          createdAt: new Date('1990-01-01'),
          updatedAt: new Date('1990-01-01'),
        },
        // Agrega más usuarios si es necesario
      ],
    };
    const mockid = '123';

    service.getUsers().subscribe((ResponseapiUser) => {
      expect(ResponseapiUser.message).toBe('test');
      expect(ResponseapiUser).toEqual(mockUsers);
    });

    const mockCreateUsers: User = {
      _id: 'test',
      nombre: 'test',
      nombreUsuario: 'test',
      contrasenia: 'test',
      createdAt: undefined,
      updatedAt: undefined,
    };

    // service.leer(mockid).subscribe((user)=>{
    //     expect(user).

    // })

    const req = httpMock.expectOne({
      method: 'GET',
      url: 'http://3.138.36.232:8080/usuarios',
    });
    req.flush(mockUsers);
  });
});
