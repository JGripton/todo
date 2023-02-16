import { IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(1)
    auth0_id: string;

    @IsNotEmpty()
    @MinLength(1)
    nickname: string;
  }