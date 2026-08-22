import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  import { Project } from '../../project/entities/project.entity';
import { entityNames } from 'src/common/enums/entityNames.enum';
  
  @Entity(entityNames.Wheel)
  export class Wheel {
    @PrimaryColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column({
      default: true,
    })
    isActive: boolean;
  
    @Column()
    projectId: number;
  
    @ManyToOne(
      () => Project,
      (project) => project.wheels,
      {
        onDelete: 'CASCADE',
      },
    )
    @JoinColumn({
      name: 'projectId',
    })
    project: Project;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }