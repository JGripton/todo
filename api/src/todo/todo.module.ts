import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task, User } from 'src/typeorm';

@Module({
  controllers: [TaskController, TaskController, UserController],
  providers: [TaskService, UserService],
  imports: [TypeOrmModule.forFeature([User,Task]),],
})
export class TodoModule {}
