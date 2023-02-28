import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { CreateTaskDto, DeleteTaskDto, UpdateTaskDto, UpdateTaskStatusDto } from '../typeorm/dto/tasks.dtos';
import { TaskService } from './task.service';
import { Task } from '../typeorm';
import { taskStub } from './stubs/task.stubs';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateUserTranslationStatusDto } from 'src/typeorm/dto/users.dtos';
import { Repository, UpdateResult } from 'typeorm';

jest.mock('./task.service')

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;
  let repository: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      imports: [],
      providers: [TaskService, {
        provide: getRepositoryToken(Task),
        useClass: Repository,
        useValue: {
          save: jest.fn().mockResolvedValue(taskStub),
          find: jest.fn().mockResolvedValue([taskStub]),
        },
      },],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  

  describe('getTaskByUserID', () => {
    describe('when getTaskByUserID is called with valid ID', () => {
      let task: Task[];
      beforeEach(async () => {
        task = await controller.getTasksByUserID("0000000000");
      })
      test('then it should call taskService', () => {
        expect(service.findAllTasksByUserID).toHaveBeenCalledWith(taskStub().auth0_id)
      })
      test('then it should return task', () => {
        expect(task).toEqual([taskStub()])
      })
    })
  })

  describe('createTask', () => {
    describe('when createTask is called', () => {
      let task: Task;
      let createTaskDto: CreateTaskDto;
      beforeEach(async () => {
        createTaskDto = {
          description: taskStub().description,
          auth0_id: taskStub().auth0_id
        }
        task = await controller.createTask(createTaskDto);
      })
      test('then it should call taskService', () => {
        expect(service.createTask).toHaveBeenCalledWith(createTaskDto)
      })
      test('then it should return task', () => {
        expect(task).toEqual(taskStub())
      })
    })
  })

  describe('completeTask', () => {
    it('should update task status', async () => {
      jest.spyOn(service, 'updateTaskStatus').mockResolvedValueOnce(taskStub());

      const result = await controller.completeTask({
        id: 0,
        auth0_id: '0000000000',
        is_completed: true,
      });

      expect(result).toEqual(taskStub());
    });
  });
  

});
