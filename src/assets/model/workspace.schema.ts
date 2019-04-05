import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Workspace {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}