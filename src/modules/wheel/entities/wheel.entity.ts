import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Project } from '../../project/entities/project.entity';
import { entityNames } from 'src/common/enums/entityNames.enum';
import { WheelItem } from 'src/modules/wheel-item/entities/wheel-item.entity';

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

  @ManyToOne(() => Project, (project) => project.wheels, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'projectId',
  })
  project: Project;

  @OneToMany(() => WheelItem, (item) => item.wheel)
  items: WheelItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
