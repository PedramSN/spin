import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { Project } from '../../project/entities/project.entity';
import { Wheel } from '../../wheel/entities/wheel.entity';
import { WheelItem } from '../../wheel-item/entities/wheel-item.entity';
import { Code } from '../../code/entities/code.entity';
import { entityNames } from 'src/common/enums/entityNames.enum';

@Entity(entityNames.Spin)
@Unique(['userId', 'projectId'])
export class Spin {
  @PrimaryColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  projectId: number;

  @Column()
  wheelId: number;

  @Column()
  wheelItemId: number;

  @Column()
  codeId: number;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'userId',
  })
  user: User;

  @ManyToOne(() => Project, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'projectId',
  })
  project: Project;

  @ManyToOne(() => Wheel, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'wheelId',
  })
  wheel: Wheel;

  @ManyToOne(() => WheelItem, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'wheelItemId',
  })
  wheelItem: WheelItem;

  @ManyToOne(() => Code, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'codeId',
  })
  code: Code;

  @CreateDateColumn()
  createdAt: Date;
}
