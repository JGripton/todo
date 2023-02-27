import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe, } from '@nestjs/common';
import { CreateUserDto, UpdateUserTranslationStatusDto } from '../typeorm/dto/users.dtos';
import { UserService } from './user.service';
import { AuthorizationGuard } from '../authorization/authorization.guard';

@Controller('user')
export class UserController {
    constructor (private readonly userService: UserService){}


    @Post('create') //Adds user to database
    @UsePipes(ValidationPipe)
    createUsers(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Get(':userID') 
    getTasksByUserID(@Param('userID')user_id: string){
        let users = this.userService.findAllUsers(user_id)
        return users;
    }

    @Post('updateTranslationStatus') //Updates database to log that user has used the translation button
    @UsePipes(ValidationPipe)
    updateTranslationStatus(@Body() updateTranslationStatusDto: UpdateUserTranslationStatusDto) {
        return this.userService.updateTranslationStatus(updateTranslationStatusDto);
    }
}
