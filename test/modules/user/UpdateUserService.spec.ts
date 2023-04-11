import { MongoError } from 'mongodb';
import { MongoUsersRepository } from './../../../src/repositories/implementations/MongoUsersRepository';
import { UpdateUserService } from './../../../src/modules/user/UpdateUserService';
import { IUsersRepository } from './../../../src/repositories/IUsersRepository';
import { ValidationError } from '../../../src/errors/ValidationError';
import { InvalidParameterError } from '../../../src/errors/InvalidParameterError';
import { PasswordUtils } from '../../../src/utils/PasswordUtils';
import { NotFoundError } from '../../../src/errors/NotFoundError';

const updateMock = jest.fn();

jest.mock(
  '../../../src/repositories/implementations/MongoUsersRepository',
  () => {
    return {
      MongoUsersRepository: jest.fn().mockImplementation(() => {
        return {
          update: updateMock,
        };
      }),
    };
  }
);

describe('Update user service', () => {
  let usersRepository: IUsersRepository;
  let updateUserService: UpdateUserService;
  let userUpdateData: { name: string; email: string; cpf: string };
  const userId = '64335a50ce62696b04f578b6';

  beforeEach(() => {
    usersRepository = new MongoUsersRepository();
    updateUserService = new UpdateUserService(usersRepository);
    userUpdateData = {
      name: 'John doe',
      email: 'email@example.com',
      cpf: '861.087.010-30',
    };
  });

  it('should be able to update a user', async () => {
    const sut = jest.spyOn(updateUserService, 'execute');

    updateMock.mockReturnValueOnce(() => {
      return updateUserService;
    });

    await updateUserService.execute(userId, userUpdateData);

    expect(sut).toHaveBeenCalledTimes(1);
    expect(sut).toHaveBeenCalledTimes(1);
    expect(updateMock).toHaveBeenCalledTimes(1);
    expect(updateMock).toHaveBeenCalledWith(userId, userUpdateData, '-__v');
  });

  it('should not be able to update a user passing invalid fields in request body', async () => {
    const invalidFields = {
      foo: 'bar',
      name: 'John doe',
    };
    const invalidCPF = {
      cpf: '000.000.000-12',
    };

    const sut = jest.spyOn(updateUserService, 'execute');

    const fn = async () => {
      await updateUserService.execute(userId, invalidFields);
    };

    expect(fn).rejects.toThrow('Invalid fields!');
    expect(fn).rejects.toThrowError(ValidationError);
    expect(async () => {
      await updateUserService.execute(userId, invalidCPF);
    }).rejects.toThrowError(
      new ValidationError('Invalid fields!', { cpf: 'Invalid CPF!' })
    );
    expect(updateMock).not.toHaveBeenCalled();
    expect(sut).toHaveBeenCalledTimes(3);
    expect(sut).toHaveBeenCalledWith(userId, invalidFields);
  });

  it('should not be able to update a user with values that are used by another user', async () => {
    const sut = jest.spyOn(updateUserService, 'execute');

    updateMock.mockImplementationOnce(() => {
      throw new MongoError('Duplicate key index!');
    });

    const fn = async () => {
      await updateUserService.execute(userId, userUpdateData);
    };

    expect(fn).rejects.toBeInstanceOf(MongoError);
    expect(sut).toHaveBeenCalledTimes(1);
    expect(updateMock).toHaveBeenCalled();
  });

  it('should not be able to update a user with invalid ID', async () => {
    const sut = jest.spyOn(updateUserService, 'execute');

    const fn = async () => {
      await updateUserService.execute('123', userUpdateData);
    };

    expect(fn).rejects.toThrowError(new InvalidParameterError('Invalid ID!'));
    expect(sut).toHaveBeenCalledTimes(1);
    expect(sut).toHaveBeenCalledWith('123', userUpdateData);
    expect(updateMock).not.toHaveBeenCalled();
  });

  it('should not to be able to update a user with empty body object', async () => {
    const sut = jest.spyOn(updateUserService, 'execute');
    const emptyObject = {};
    const fn = async () => {
      await updateUserService.execute(userId, emptyObject);
    };

    expect(fn).rejects.toThrowError(
      new ValidationError('Invalid body!', {
        error: 'At least one field is required to update!',
      })
    );

    expect(sut).toHaveBeenCalledTimes(1);
    expect(sut).toHaveBeenCalledWith(userId, emptyObject);
    expect(updateMock).not.toHaveBeenCalled();
  });

  it('should encrypt user password again when updating password', async () => {
    const sut = jest.spyOn(updateUserService, 'execute');
    const passwordUtilsSpy = jest.spyOn(PasswordUtils, 'hashPass');
    const updateObject = {
      password: '123456',
    };

    updateMock.mockImplementationOnce(() => {
      return updateObject;
    });

    await updateUserService.execute(userId, updateObject);
    expect(passwordUtilsSpy).toHaveBeenCalledTimes(1);
    expect(passwordUtilsSpy).toHaveBeenCalledWith('123456');
    expect(sut).toHaveBeenCalledTimes(1);
    expect(updateMock).toHaveBeenCalledTimes(1);
  });

  it('should not be able to update a user that not exists', async () => {
    const sut = jest.spyOn(updateUserService, 'execute');
    const updateObject = {
      password: '123456',
    };

    updateMock.mockImplementationOnce(() => {
      return null;
    });

    const fn = async () => {
      await updateUserService.execute(userId, updateObject);
    };

    expect(fn).rejects.toThrowError(new NotFoundError('User not found!'));
    expect(sut).toHaveBeenCalledTimes(1);
    expect(sut).toHaveBeenCalledWith(userId, updateObject);
    expect(updateMock).not.toHaveBeenCalled();
  });
});
