import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('frameworks')


export class Framework {
    @PrimaryGeneratedColumn()
    id: number;

      @Column('varchar', { name: 'skill_id' })
    skill_id: string;

    @Column('varchar')
    framework_name: string;
    
}
