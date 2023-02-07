import { Controller, Get, NotFoundException, NotImplementedException, Param } from '@nestjs/common';
import { TaskService } from '../task/task.service';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TaskService) {}

    @Get(':userId')
    getTasksByUserId(@Param('userId') id: number) {
        let task = this.taskService.findAllTasksByUserId(id);

        if (!task){
            throw new NotFoundException('Either user with Id ${id} does not exist or has no tasks');
        }
        return task;
    }


}
