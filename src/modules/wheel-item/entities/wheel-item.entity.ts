import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  import { Wheel } from '../../wheel/entities/wheel.entity';
  
  @Entity('wheel_items')
  export class WheelItem {
    @PrimaryColumn()
    id: number;
  
    @Column()
    title: string;
  
    @Column()
    type: string;
  
    @Column({ nullable: true })
    value: string;
  
    @Column({
      type: 'decimal',
      precision: 5,
      scale: 2,
    })
    probability: number;
  
    @Column({
        type: 'int',
        nullable: true,
      })
      stock: number | null;
  
    @Column({
      default: true,
    })
    isActive: boolean;
  
    @Column()
    wheelId: number;
  
    @ManyToOne(
      () => Wheel,
      (wheel) => wheel.items,
      {
        onDelete: 'CASCADE',
      },
    )
    @JoinColumn({
      name: 'wheelId',
    })
    wheel: Wheel;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }