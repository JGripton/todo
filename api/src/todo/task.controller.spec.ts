import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { CreateTaskDto, DeleteTaskDto, UpdateTaskDto, UpdateTaskStatusDto } from '../typeorm/dto/tasks.dtos';
import { TaskService } from './task.service';
import { Task } from '../typeorm';
import { taskStub } from './stubs/task.stubs';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateUserTranslationStatusDto } from 'src/typeorm/dto/users.dtos';

jest.mock('./task.service')

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      imports: [CreateTaskDto, DeleteTaskDto, UpdateTaskDto, UpdateTaskStatusDto, Task, ],
      providers: [TaskService, {
        provide: getRepositoryToken(Task),
        useValue: {
          save: jest.fn().mockResolvedValue(taskStub),
          find: jest.fn().mockResolvedValue([taskStub]),
        },
      },],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
    jest.clearAllMocks();
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

  describe('UpdateTaskStatus', () => {
    describe('when updateTaskStatus is called', () => {
      let task: Task;

      let updateTaskStatus: UpdateTaskStatusDto;
      beforeEach(async () => {
        updateTaskStatus = {
          id: taskStub().id,
          auth0_id: taskStub().auth0_id,
        }
        task = await controller.completeTask(updateTaskStatus)
      })
      test('then it should call taskService', () => {
        expect(service.updateTask).toHaveBeenCalledWith(updateTaskStatus, updateTaskStatus.id, updateTaskStatus.auth0_id)
      })
      test('then it should return task', () => {
        //taskStub().description = "Walk the cat"
        expect(task).toEqual(taskStub())
      })
    })
  })

 
  



});
