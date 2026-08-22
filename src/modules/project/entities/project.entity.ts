import { entityNames } from 'src/common/enums/entityNames.enum';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity(entityNames.Project)
  export class Project {
    @PrimaryColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column({
      unique: true,
    })
    slug: string;
  
    @Column({
      default: true,
    })
    isActive: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }