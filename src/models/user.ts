import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'user_id' })
    userId: number;

    @Column({ name: 'user_name' })
    userName: string;

    @Column({ name: 'password' })
    password: string;

    @Column({ name: 'email' })
    email: string;

    @Column({ name: 'emp_no' })
    empNo: string;

    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'middle_name' })
    middleName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @Column({ name: 'gender' })
    gender: number;

    @Column({ name: 'created_date' })
    createdDate: Date;

    @Column({ name: 'modified_date' })
    modifiedDate: Date;

    @Column({ name: 'created_by' })
    createdBy: string;

    @Column({ name: 'modified_by' })
    modifiedBy: string;

    @Column({ name: 'is_admin' })
    isAdmin: number;
}
