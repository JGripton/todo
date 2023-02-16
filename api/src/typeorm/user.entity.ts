import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    name: 'auth0_id',
    nullable: false,
    default: '',
  })
  auth0_id: string;

  @Column({
    name: 'nickname',
    nullable: false,
    default: '',
  })
  nickname: string;

}