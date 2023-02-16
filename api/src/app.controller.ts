import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthorizationGuard } from './authorization/authorization.guard';
import { TaskService } from './todo/task.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  //@UseGuards(AuthorizationGuard)
  
}
