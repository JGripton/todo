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

  @Column({
    name: 'has_translated',
    nullable: false,
    default: false,
  })
  has_translated: boolean;

  @Column({
    name: 'is_admin',
    nullable: false,
    default: false,
  })
  is_admin: boolean;

}