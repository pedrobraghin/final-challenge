import { ValidationError } from '../../../src/errors/ValidationError';
import { InputUserDTO } from '../../../src/interfaces/InputUserDTO';
import { CreateUserService } from '../../../src/modules/user/CreateUserService';
import { IUsersRepository } from '../../../src/repositories/IUsersRepository';
import { MongoUsersRepository } from '../../../src/repositories/implementations/MongoUsersRepository';
import { PasswordUtils } from '../../../src/utils/PasswordUtils';
import { Validators } from '../../../src/utils/Validators';
import FetchAddress from '../../../src/utils/FetchAddress';

const createMock = jest.fn();

jest.mock(
  '../../../src/repositories/implementations/MongoUsersRepository',
  () => {
    return {
      MongoUsersRepository: jest.fn().mockImplementation(() => {
        return {
          create: createMock,
        };
      }),
    };
  }
);

describe('Create user service', () => {
  let createUserService: CreateUserService;
  let usersRepository: IUsersRepository;

  let userData: InputUserDTO;

  beforeEach(() => {
    usersRepository = new MongoUsersRepository();
    createUserService = new CreateUserService(usersRepository);
    userData = {
      birth: '02-02-2000',
      cep: '16920000',
      cpf: '861.087.010-30',
      email: 'email@example.com',
      name: 'John',
      password: '123456',
      passwordConfirm: '123456',
      qualified: true,
    };
  });

  it('should be able to create a user', async () => {
    const execSpy = jest.spyOn(createUserService, 'execute');
    createMock.mockReturnValueOnce({
      ...userData,
      patio: '',
      complement: '',
      locality: 'Castilho',
      uf: 'SP',
    });

    const result = await createUserService.execute(userData);

    expect(createMock).toBeCalledTimes(1);
    expect(createMock).toBeCalledWith(userData);
    expect(result).toHaveProperty('patio');
    expect(result).toHaveProperty('complement');
    expect(result).toHaveProperty('locality');
    expect(result).toHaveProperty('uf');
    expect(execSpy).toBeCalledTimes(1);
  });

  it('should not be able to create a user with empty fields', async () => {
    const execSpy = jest.spyOn(createUserService, 'execute');
    const validatorsSpy = jest.spyOn(Validators, 'validateCreateUserInputData');
    const emptyObject = {} as InputUserDTO;

    const fn = async () => {
      await createUserService.execute(emptyObject);
    };

    expect(fn).rejects.toThrowError(ValidationError);

    expect(execSpy).toBeCalledTimes(1);
    expect(execSpy).toBeCalledWith(emptyObject);
    expect(validatorsSpy).toHaveBeenCalledTimes(1);
    expect(validatorsSpy).toHaveBeenCalledWith(emptyObject);
  });

  it('should not be able to create a user with invalid email', () => {
    const execSpy = jest.spyOn(createUserService, 'execute');
    const validatorsSpy = jest.spyOn(Validators, 'validateCreateUserInputData');
    userData.email = 'test.com';

    const fn = async () => {
      await createUserService.execute(userData);
    };

    expect(fn).rejects.toThrowError(ValidationError);

    expect(execSpy).toBeCalledTimes(1);
    expect(execSpy).toBeCalledWith(userData);
    expect(validatorsSpy).toHaveBeenCalledTimes(1);
    expect(validatorsSpy).toHaveBeenCalledWith(userData);
  });

  it('should not be able to create a user with invalid CPF', async () => {
    const execSpy = jest.spyOn(createUserService, 'execute');
    const validatorsSpy = jest.spyOn(Validators, 'validateCreateUserInputData');

    userData.cpf = '011.171.240-81';
    const fn = async () => {
      await createUserService.execute(userData);
    };

    expect(fn).rejects.toThrowError(ValidationError);

    expect(execSpy).toBeCalledTimes(1);
    expect(execSpy).toBeCalledWith(userData);
    expect(validatorsSpy).toHaveBeenCalledTimes(1);
    expect(validatorsSpy).toHaveBeenCalledWith(userData);
  });

  it('should encrypt user password when create a new user', async () => {
    const notHashedPass = userData.password;
    const execSpy = jest.spyOn(createUserService, 'execute');
    const hashSpy = jest.spyOn(PasswordUtils, 'hashPass');

    await createUserService.execute(userData);

    expect(execSpy).toBeCalledTimes(1);
    expect(execSpy).toBeCalledWith(userData);
    expect(hashSpy).toHaveBeenCalledTimes(1);
    expect(hashSpy).toHaveBeenCalledWith(notHashedPass);
  });

  it('should call external CEP API when create a new user', async () => {
    const fetchByCepSpy = jest.spyOn(FetchAddress, 'fetchByCep');
    const execSpy = jest.spyOn(createUserService, 'execute');

    await createUserService.execute(userData);

    expect(fetchByCepSpy).toHaveBeenCalledTimes(1);
    expect(fetchByCepSpy).toBeCalledWith(userData.cep);
    expect(execSpy).toBeCalledTimes(1);
    expect(execSpy).toBeCalledWith(userData);
  });
});
