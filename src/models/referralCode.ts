import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity('referral_code')
export class ReferralCode extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'code' })
    code: string;

    @Column({ name: 'type' })
    type: string;

    @Column({ name: 'desc' })
    desc: string;

    @Column({ name: 'created_by' })
    createdBy: string;

    @Column({ name: 'created_date' })
    createdDate: Date;

    @Column({ name: 'updated_by' })
    updatedBy: string;

    @Column({ name: 'updated_date' })
    updatedDate: Date;
    
    userCreated: User;
    userUpdated: User;
}
