import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { CreateTaskDto, DeleteTaskDto, UpdateTaskDto, UpdateTaskStatusDto } from '../typeorm/dto/tasks.dtos';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task, User } from '../typeorm';
import { taskStub } from './stubs/task.stubs';
import { TaskController } from './task.controller';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userStub } from './stubs/user.stubs';

describe('TaskService', () => {
  let service: TaskService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController, UserController],
      imports: [CreateTaskDto, DeleteTaskDto, UpdateTaskDto, UpdateTaskStatusDto, Task, ],
      providers: [TaskService,{
        provide: getRepositoryToken(Task),
        useValue: {
          save: jest.fn().mockResolvedValue(taskStub),
          find: jest.fn().mockResolvedValue([taskStub]),
        },
      }, UserService,
      {
        provide: getRepositoryToken(User),
        useValue: {
          save: jest.fn().mockResolvedValue(userStub),
          find: jest.fn().mockResolvedValue([userStub]),
        },
      },],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


});
