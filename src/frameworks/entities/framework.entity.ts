import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('frameworks')


export class Framework {
    @PrimaryGeneratedColumn()
    id: number;

      @Column()
    skill_id: string;

    @Column()
    framework_name: string;
    
}
