import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserTranslationStatusDto } from '../typeorm/dto/users.dtos';
import { User } from '../typeorm';
import { userStub } from './stubs/user.stubs';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateTaskDto } from 'src/typeorm/dto/tasks.dtos';
import { EntityNotFoundError, Repository } from 'typeorm';

jest.mock('./user.service')
describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      imports: [CreateUserDto, UpdateUserTranslationStatusDto, User],
      providers: [UserService, {
        provide: getRepositoryToken(User),
        useClass: Repository,
        useValue: {
          save: jest.fn().mockResolvedValue(userStub), 
          find: jest.fn().mockResolvedValue([userStub]),
        },
      },],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: User;
      let createUserDto: CreateUserDto;
      beforeEach(async () => {
        createUserDto = {
          auth0_id: userStub().auth0_id,
          nickname: userStub().nickname
        };
        jest.spyOn(service, 'createUser').mockResolvedValue(userStub());
        user = await controller.createUsers(createUserDto);
      });
      test('then it should call userService', () => {
        expect(service.createUser).toHaveBeenCalledWith(createUserDto);
      });
      test('then it should return user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
  

  describe('getUsers', () => {
    describe('when getUsers is called', () => {
      let user: User[];
      beforeEach(async () => {
        jest.spyOn(service, 'findAllUsers').mockResolvedValue([userStub()]);
        user = await controller.getAllUsers("0000000000");
      });
      test('then it should call userService', () => {
        expect(service.findAllUsers).toHaveBeenCalledWith("0000000000");
      });
      test('then it should return user', () => {
        expect(user).toEqual([userStub()]);
      });
    });
  });

  describe('completeTask', () => {
    it('should update task status', async () => {
      jest.spyOn(service, 'updateTranslationStatus').mockResolvedValueOnce(userStub());

      const result = await controller.updateTranslationStatus({
        auth0_id: '0000000000',
        has_translated: true
      });

      expect(result).toEqual(userStub());
    });
  });

  

});
