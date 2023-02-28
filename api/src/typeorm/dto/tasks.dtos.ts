import { IsNotEmpty, MinLength } from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty()
    @MinLength(1)
    description: string;

    @IsNotEmpty()
    @MinLength(8)
    auth0_id: string;
  }

  export class UpdateTaskDto {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    @MinLength(1)
    description: string;

    @IsNotEmpty()
    @MinLength(8)
    auth0_id: string;
  }

  export class UpdateTaskStatusDto {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    @MinLength(8)
    auth0_id: string;

    is_completed: boolean;
  }

  export class DeleteTaskDto {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    @MinLength(8)
    auth0_id: string;
  }