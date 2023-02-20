import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../typeorm';
import { CreateUserDto, UpdateUserTranslationStatusDto } from '../typeorm/dto/users.dtos';
import { userStub } from './stubs/user.stubs';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

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

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
