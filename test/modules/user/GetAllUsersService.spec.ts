import { GetAllUsersService } from './../../../src/modules/user/GetAllUsersService';
import { IUsersRepository } from '../../../src/repositories/IUsersRepository';
import { MongoUsersRepository } from '../../../src/repositories/implementations/MongoUsersRepository';
import { InvalidParameterError } from '../../../src/errors/InvalidParameterError';

const indexMock = jest.fn();

jest.mock(
  '../../../src/repositories/implementations/MongoUsersRepository',
  () => {
    return {
      MongoUsersRepository: jest.fn().mockImplementation(() => {
        return {
          index: indexMock,
        };
      }),
    };
  }
);

describe('Get all users service', () => {
  let usersRepository: IUsersRepository;
  let getAllUsersService: GetAllUsersService;

  beforeEach(() => {
    usersRepository = new MongoUsersRepository();
    getAllUsersService = new GetAllUsersService(usersRepository);
  });

  it('should be able to get all users', async () => {
    const sut = jest.spyOn(getAllUsersService, 'execute');

    await getAllUsersService.execute(0, 0);

    expect(indexMock).toHaveBeenCalledWith(0, 0, '-__v');
    expect(indexMock).toHaveBeenCalledTimes(1);
    expect(sut).toHaveBeenCalledTimes(1);
    expect(sut).toHaveBeenCalledWith(0, 0);
  });

  it('should not be able to get all users passing invalid limit and offset values', async () => {
    const sut = jest.spyOn(getAllUsersService, 'execute');

    const fn = async () => {
      await getAllUsersService.execute(-1, -1);
    };

    expect(fn).rejects.toThrowError(
      new InvalidParameterError(
        'Limit and offset must be numbers and greater than or equal to 0.'
      )
    );

    expect(sut).toHaveBeenCalledTimes(1);
    expect(sut).toHaveBeenCalledWith(-1, -1);
    expect(indexMock).not.toHaveBeenCalled();
  });
});
