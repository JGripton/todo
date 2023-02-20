import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserTranslationStatusDto } from '../typeorm/dto/users.dtos';
import { User } from '../typeorm';
import { userStub } from './stubs/user.stubs';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      imports: [CreateUserDto, UpdateUserTranslationStatusDto],
      providers: [UserService, {
        provide: getRepositoryToken(User),
        useValue: {
          save: jest.fn().mockResolvedValue(userStub),
          find: jest.fn().mockResolvedValue([userStub]),
        },
      },],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
