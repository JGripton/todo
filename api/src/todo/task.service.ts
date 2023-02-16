import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/typeorm';
import { CreateTaskDto, DeleteTaskDto, UpdateTaskDto } from 'src/typeorm/dto/tasks.dtos';
import { Repository, DataSource } from 'typeorm';
import { TaskModel } from './task.model';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
      ) {}


    _tasks: TaskModel[] = [
        {id: 1, user_id: "1", description: "1"},
        {id: 2, user_id: "1", description: "7"},
    ]

    createTask(createTaskDto: CreateTaskDto) {
        const newTask = this.taskRepository.create(createTaskDto);
        return this.taskRepository.save(newTask);
      }

    findAllTasksByUserID(auth0_id: string){
        return this.taskRepository.find({where: {auth0_id: auth0_id}});
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
