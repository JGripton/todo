import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../typeorm';
import { CreateUserDto, UpdateUserTranslationStatusDto } from '../typeorm/dto/users.dtos';
import { Repository } from 'typeorm';
import { isEmpty } from 'class-validator';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
      ) {}

       createUser(createUserDto: CreateUserDto) {
        const ifExists = this.userRepository.findOne({where: {auth0_id: createUserDto.auth0_id}})
        const promise1 = Promise.resolve(ifExists)
        return promise1.then((value) => {
          if (isEmpty(value)) //Checks if user is already in database, adds user if not
            {
              const newUser = this.userRepository.create(createUserDto);
              return this.userRepository.save(newUser);
            }
        })
      }

      async findAllUsers(auth0_id: string){
        const isAdmin = this.userRepository.findOne({where: {auth0_id: auth0_id}})
        if ((await isAdmin).is_admin == true){
          return this.userRepository.find();
        }
        else return;
    }

    async updateTranslationStatus(updateTranslationStatusDto: UpdateUserTranslationStatusDto): Promise<User> {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where('user.auth0_id = :auth0_id', { auth0_id: updateTranslationStatusDto.auth0_id })
        .getOneOrFail();
    
      if (user) { //Checks that user was found
        const updatedUser = await this.userRepository.update(user.id, updateTranslationStatusDto);
        return { ...user, ...updateTranslationStatusDto } as User;
      }
    }
    

      findUserByAuth0(id: string){
        return this.userRepository.findOne({where: {id: parseInt(id, 10)}});
      }
      

}
