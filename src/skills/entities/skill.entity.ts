import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('skills')

export class Skill {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

 
}
