import { IUsersRepository } from '../../../src/repositories/IUsersRepository';
import { DeleteUserByIdService } from '../../../src/modules/user/DeleteUserByIdService';
import { MongoUsersRepository } from '../../../src/repositories/implementations/MongoUsersRepository';
import { NotFoundError } from '../../../src/errors/NotFoundError';
import { InvalidParameterError } from '../../../src/errors/InvalidParameterError';
import { MongoUtils } from '../../../src/utils/MongoUtils';

const deleteMock = jest.fn();

jest.mock(
  '../../../src/repositories/implementations/MongoUsersRepository',
  () => {
    return {
      MongoUsersRepository: jest.fn().mockImplementation(() => {
        return {
          delete: deleteMock,
        };
      }),
    };
  }
);

describe('Delete user service', () => {
  let usersRepository: IUsersRepository;
  let deleteUserByIdService: DeleteUserByIdService;
  let userData: { _id: string };

  beforeEach(() => {
    usersRepository = new MongoUsersRepository();
    deleteUserByIdService = new DeleteUserByIdService(usersRepository);
    userData = {
      _id: '64335a50ce62696b04f578b6',
    };
  });

  it('should be able to delete a user', async () => {
    const sut = jest.spyOn(deleteUserByIdService, 'execute');

    deleteMock.mockImplementationOnce(() => {
      return userData;
    });

    await deleteUserByIdService.execute(userData._id);

    expect(sut).toHaveBeenCalledWith(userData._id);
    expect(sut).toHaveBeenCalledTimes(1);
  });

  it('should not be able to delete a user that not exist', async () => {
    const sut = jest.spyOn(deleteUserByIdService, 'execute');

    deleteMock.mockImplementationOnce(() => {
      return null;
    });

    expect(async () => {
      await deleteUserByIdService.execute(userData._id);
    }).rejects.toThrowError(new NotFoundError('User not found!'));
    expect(sut).toHaveBeenCalledWith(userData._id);
    expect(sut).toHaveBeenCalledTimes(1);
  });

  it('should not be able to delete a user with invalid id', async () => {
    const sut = jest.spyOn(deleteUserByIdService, 'execute');
    const isValidIdSpy = jest.spyOn(MongoUtils, 'isValidId');
    userData._id = '123';

    expect(async () => {
      await deleteUserByIdService.execute(userData._id);
    }).rejects.toThrowError(new InvalidParameterError('Invalid ID!'));
    expect(sut).toHaveBeenCalledWith(userData._id);
    expect(sut).toHaveBeenCalledTimes(1);
    expect(isValidIdSpy).toHaveBeenCalledTimes(1);
    expect(isValidIdSpy).toHaveBeenCalledWith(userData._id);
    expect(isValidIdSpy).toHaveLastReturnedWith(false);
  });
});
