import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text', {nullable: true})
    msg?: string;

    @Column()
    read: boolean;

    @Column('date')
    date: Date;
}