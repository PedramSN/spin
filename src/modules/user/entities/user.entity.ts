import { entityNames } from 'src/common/enums/entityNames.enum';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity(entityNames.User)
  export class User {
    @PrimaryColumn()
    id: number;
  
    @Column({ unique: true })
    phone: string;

    @Column({
      default: false,
    })
    isAdmin: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }