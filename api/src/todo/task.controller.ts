import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { CreateTaskDto, DeleteTaskDto, UpdateTaskDto } from 'src/typeorm/dto/tasks.dtos';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';


@Controller('task')
export class TaskController {

    constructor(private readonly taskService: TaskService) {}

        @Get()
        getTasks(){
            
        }

        @Post('create')
        @UsePipes(ValidationPipe)
            createUsers(@Body() createTaskDto: CreateTaskDto) {
                return this.taskService.createTask(createTaskDto);
            }
        
        
        @Get(':userID')
        getTasksByUserID(@Param('userID')user_id: string){
            let task = this.taskService.findAllTasksByUserID(user_id);
            
            if(!task){
                throw new NotFoundException('No tasks found')
            } //TODO: Add method to check current users ID
            return task;
        }

        @Post('update') //updates task if task is created by current user
        @UsePipes(ValidationPipe)
            updateTask(@Body() updateTaskDto: UpdateTaskDto) {
                return this.taskService.updateTask(updateTaskDto, updateTaskDto.id, updateTaskDto.auth0_id);
            }

        @Post('delete') //deletes task if task is created by current user
        @UsePipes(ValidationPipe)
            deleteTask(@Body() deleteTaskDto: DeleteTaskDto) {
                return this.taskService.deleteTask(deleteTaskDto, deleteTaskDto.id, deleteTaskDto.auth0_id);
            }


}

