import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class TaskModel {
    
    id: number;
    user_id: number;
    description: string;
    is_complete: boolean;
}