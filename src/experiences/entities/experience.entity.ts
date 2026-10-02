import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('experiences')
export class Experience {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  role: string;

  @Column('varchar')
  company: string;

  @Column('varchar', { nullable: true })
  description: string;

  @Column('date')
  start_date: string;

  @Column('date', { nullable: true })
  end_date: string | null;

  @Column({ type: 'tinyint', width: 1 })
  current: number;

  @CreateDateColumn()
  created_at: Date;
}