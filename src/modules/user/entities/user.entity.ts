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
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }