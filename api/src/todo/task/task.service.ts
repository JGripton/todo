import { Injectable } from '@nestjs/common';
import { TaskModel } from './task.model';

@Injectable()
export class TaskService {
    
    _tasks: TaskModel[] = [
        {id: 1, user_id: 1, description: "Test", is_complete: false},
    ]

    findAllTasksByUserId(userId: number): TaskModel { 
        return this._tasks.find(t => t.user_id == userId);
    }


}
