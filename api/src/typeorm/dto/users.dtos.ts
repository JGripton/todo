import { IsNotEmpty, MinLength } from "class-validator";
import {Column, Index } from 'typeorm'

@Index(['auth0_id'], { unique: true }) // Here
export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(8)
    @Column({unique: true})
    auth0_id: string;

    @IsNotEmpty()
    @MinLength(1)
    nickname: string;
  }

  export class UpdateUserTranslationStatusDto {
    @IsNotEmpty()
    @MinLength(8)
    auth0_id: string;

    @IsNotEmpty()
    has_translated: boolean;
  }

