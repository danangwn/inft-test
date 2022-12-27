import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('accesstoken')
export class Accesstoken extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @PrimaryColumn({ name: 'id' })
    id: string;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'conf' })
    conf: string;

    @Column({ name: 'created_date' })
    createdDate: Date;
}
