import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
//import { Courses } from './model/courses.entity';
import { TodoModule } from './todo/todo.module';


@Module({
  imports: [
    //TypeOrmModule.forFeature([Courses]),
    ConfigModule.forRoot({ isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: false, // shouldn't be used in production - may lose data
    }),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
