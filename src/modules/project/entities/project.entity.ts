import { entityNames } from 'src/common/enums/entityNames.enum';
import { Wheel } from 'src/modules/wheel/entities/wheel.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
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

    @OneToMany(
        () => Wheel,
        (wheel) => wheel.project,
      )
      wheels: Wheel[];
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }