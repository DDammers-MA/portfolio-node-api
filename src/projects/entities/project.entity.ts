import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  subTitle: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  main_image: string;

  @Column({ nullable: true })
  sub_image_1: string;

  @Column({ nullable: true })
  sub_image_2: string;

  @Column({ nullable: true })
  sub_image_3: string;

  @Column({ nullable: true })
  github_url: string;

  @Column({ nullable: true })
  live_url: string;

  @Column({ nullable: true })
created_by: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;
}