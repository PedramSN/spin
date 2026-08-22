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
  
  @Entity('codes')
  export class Code {
    @PrimaryColumn()
    id: number;
  
    @Column({
      unique: true,
    })
    code: string;
  
    @Column()
    projectId: number;
  
    @Column({
      default: true,
    })
    isActive: boolean;
  
    @ManyToOne(
      () => Project,
      (project) => project.codes,
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