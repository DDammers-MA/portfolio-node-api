import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('experiences')

export class Experience {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    role: string;

    
    @Column('varchar')
    company: string;

    
    @Column('varchar')
    description: string;

    
    @Column('varchar')
    start_date: string;

    
    @Column('varchar')
    end_date: string;

     @Column('varchar')
    current: string;

     @Column('varchar')
    created_at: string;
}
