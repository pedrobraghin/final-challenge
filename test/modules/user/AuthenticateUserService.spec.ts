import { JWTHandler } from './../../../src/jwt/JWTHandler';
import { IUsersRepository } from '../../../src/repositories/IUsersRepository';
import { MongoUsersRepository } from '../../../src/repositories/implementations/MongoUsersRepository';
import { AuthenticateUserService } from './../../../src/modules/user/AuthenticateUserService';
import { PasswordUtils } from '../../../src/utils/PasswordUtils';
import { InvalidParameterError } from '../../../src/errors/InvalidParameterError';
import { UnauthorizedError } from '../../../src/errors/UnauthorizedError';

const findByEmailMock = jest.fn();

jest.mock(
  '../../../src/repositories/implementations/MongoUsersRepository',
  () => {
    return {
      MongoUsersRepository: jest.fn().mockImplementation(() => {
        return {
          findByEmail: findByEmailMock,
        };
      }),
    };
  }
);

describe('Authenticate user service', () => {
  let authenticateUserService: AuthenticateUserService;
  let usersRepository: IUsersRepository;

  const userData = {
    email: 'email@example.com',
    password: '123456',
  };

  beforeEach(() => {
    usersRepository = new MongoUsersRepository();
    authenticateUserService = new AuthenticateUserService(usersRepository);
  });

  it('should be able to login a user with valid credentials', async () => {
    const sut = jest.spyOn(authenticateUserService, 'execute');
    const comparePassSpy = jest.spyOn(PasswordUtils, 'comparePass');
    const JWTHandlerSpy = jest.spyOn(JWTHandler, 'generateToken');
    const fakeHashedUserPass = userData.password;
    const fakeToken = 'fake-random-token';

    JWTHandlerSpy.mockReturnValueOnce(fakeToken);
    comparePassSpy.mockResolvedValueOnce(true);
    findByEmailMock.mockResolvedValueOnce({ password: fakeHashedUserPass });

    const result = await authenticateUserService.execute(
      userData.email,
      userData.password
    );

    expect(sut).toHaveBeenCalledTimes(1);
    expect(sut).toHaveBeenCalledWith(userData.email, userData.password);

    expect(findByEmailMock).toHaveBeenCalledTimes(1);
    expect(findByEmailMock).toHaveBeenCalledWith(userData.email, 'password');

    expect(comparePassSpy).toHaveBeenCalledTimes(1);
    expect(comparePassSpy).toHaveBeenCalledWith(
      userData.password,
      fakeHashedUserPass
    );
    expect(result).toEqual(fakeToken);
  });

  it('should not be able to login a user without email or password', () => {
    const fn = async () => {
      await authenticateUserService.execute('', '');
    };
    expect(fn).rejects.toThrowError(
      new InvalidParameterError('Email and Password must be provided!')
    );
  });

  it('should not be able to login a user with an email that not exists', () => {
    const email = 'email@example.com';
    const fn = async () => {
      await authenticateUserService.execute(email, '123456');
    };

    expect(fn).rejects.toThrowError(
      new UnauthorizedError('Invalid email or password!')
    );
    expect(findByEmailMock).toHaveBeenCalledTimes(1);
    expect(findByEmailMock).toHaveBeenCalledWith(email, 'password');
  });

  it('should not be able to login a user with invalid password', async () => {
    const fakePass = '12345678';
    const comparePassSpy = jest.spyOn(PasswordUtils, 'comparePass');

    findByEmailMock.mockResolvedValueOnce({ password: userData.password });
    findByEmailMock.mockImplementation(() => {
      return { password: userData.password };
    });

    const fn = async () => {
      await authenticateUserService.execute(userData.email, fakePass);
    };

    await expect(fn).rejects.toThrowError(
      new UnauthorizedError('Invalid email or password!')
    );

    expect(findByEmailMock).toHaveBeenCalledWith(userData.email, 'password');
    expect(findByEmailMock).toHaveBeenCalledTimes(1);
    expect(comparePassSpy).toHaveBeenCalledTimes(1);
    expect(comparePassSpy).toHaveBeenCalledWith(fakePass, userData.password);
  });
});
