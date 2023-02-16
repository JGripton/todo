import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe, } from '@nestjs/common';
import { CreateUserDto } from 'src/typeorm/dto/users.dtos';
import { UserService } from './user.service';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';

@Controller('user')
export class UserController {
    constructor (private readonly userService: UserService){}


    @Post('create')
    @UsePipes(ValidationPipe)
    createUsers(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }
}
