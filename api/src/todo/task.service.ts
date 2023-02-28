import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Task } from '../typeorm';
import { CreateTaskDto, DeleteTaskDto, UpdateTaskDto, UpdateTaskStatusDto } from '../typeorm/dto/tasks.dtos';
import { Repository, DataSource } from 'typeorm';
import { TaskModel } from './task.model';
import { UserService } from './user.service';
import { CreateUserDto } from '../typeorm/dto/users.dtos';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task) private readonly taskRepository: Repository<Task>, 
        private readonly userService: UserService
      ) {}


    _tasks: TaskModel[] = [
        {id: 1, user_id: "1", description: "1"},
        {id: 2, user_id: "1", description: "7"},
    ]

     createTask(createTaskDto: CreateTaskDto) {
        const newTask = this.taskRepository.create(createTaskDto);
        return this.taskRepository.save(newTask);
      }

    async findAllTasksByUserID(auth0_id: string){
       
        return this.taskRepository.find({where: {auth0_id: auth0_id}});
    }
    async findTaskByID(id: number){
      return this.taskRepository.find({where: {id: id}});
  }

    async updateTask(updateTaskDto: UpdateTaskDto, id: number, auth0_id: string){
      const updateTask = await this.taskRepository
        .createQueryBuilder("task")
        .where("task.id = :id AND task.auth0_id = :auth0_id", { id: id, auth0_id: auth0_id })
       .getOneOrFail() //looks for task matching the ID and auth0_id in the json | throws entity not found error if not found

      if (updateTask){ //checks if a matching task was found
        return this.taskRepository.update(id, updateTaskDto);
      }
    }

    async updateTaskStatus(updateTaskStatusDto: UpdateTaskStatusDto, id: number, auth0_id: string): Promise<Task> {
      const task = await this.taskRepository
        .createQueryBuilder('task')
        .where('task.id = :id AND task.auth0_id = :auth0_id', { id: id, auth0_id: auth0_id })
        .getOneOrFail();
      
    
      if (task) {
        task.is_completed = updateTaskStatusDto.is_completed;
        await this.taskRepository.save(task);
        return task;
      }
    }
    
    
    

    async deleteTask(deleteTaskDto: DeleteTaskDto, id: number, auth0_id: string){
      const deleteTask = await this.taskRepository
        .createQueryBuilder("task")
        .where("task.id = :id AND task.auth0_id = :auth0_id", { id: id, auth0_id: auth0_id })
       .getOneOrFail() //looks for task matching the ID and auth0_id in the json | throws entity not found error if not found

      if (deleteTask){ //checks if a matching task was found
        return this.taskRepository.delete(id);
      }
    }

}
