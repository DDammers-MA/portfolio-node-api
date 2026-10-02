import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('experiences')

export class Experience {

    @PrimaryGeneratedColumn()
      @IsOptional()
    id: number;

    @Column('varchar')
      @IsNotEmpty()
    role: string;

    
    @Column('varchar')
    @IsOptional()
    company: string;

    
    @Column('varchar')
      @IsOptional()
    description: string;

    
    @Column('varchar')
         @IsDateString()
    start_date: string;

    
    @Column('varchar')
     @IsDateString()
    end_date: string;

     @Column({ type: 'tinyint', width: 1 })
       @IsNotEmpty()
    current: number;

     @Column('varchar')
    @IsDateString()
    created_at: string;
}
