import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    name: 'auth0_id',
    nullable: false,
    default: '1',
  })
  auth0_id: string;

  @Column({
    name: 'description',
    nullable: false,
    default: '',
  })
  description: string;

  @Column({
    nullable: false,
    default: false,
  })
  is_completed: boolean;

}