import { Injectable } from "@nestjs/common";
import { Auth } from "src/interfaces/auth.dto";
import * as moment from 'moment';
import { ReferralCode } from "src/models/referralCode";
import { User } from "src/models/user";
import { PaginationOptions } from "src/helpers/pagination.helper";

@Injectable()
export class ReferralService {

  constructor(
  ) { }

  async listing(code: string, pagination: PaginationOptions) {
    try {
        const datas: any[] = [];
        code = code ? code : '';
        const query = await ReferralCode.createQueryBuilder('ref')
        .leftJoinAndMapOne('ref.userCreated', User, 'userCreated', 'userCreated.userId = ref.createdBy')
        .leftJoinAndMapOne('ref.userUpdated', User, 'userUpdated', 'userUpdated.userId = ref.updatedBy')
        .where('ref.code LIKE :code', { code: `%${code}%` })
        .select([
            'ref',
            'userCreated.firstName',
            'userCreated.middleName',
            'userCreated.lastName',
            'userCreated.userId',
            'userUpdated.firstName',
            'userUpdated.middleName',
            'userUpdated.lastName',
            'userUpdated.userId',
        ])
        .skip(pagination.queryPage)
        .take(pagination.limit)
        .getManyAndCount();

        const referral = query[0];
        const total = query[1];

        if (referral && referral.length > 0) {
            for (let i = 0; i < referral.length; i++) {

                let createdBy = referral[i].userCreated && referral[i].userCreated.firstName? referral[i].userCreated.firstName : '';
                if (referral[i].userCreated && referral[i].userCreated.middleName) {
                    createdBy = createdBy + ' ' + referral[i].userCreated.middleName;
                }
                if (referral[i].userCreated && referral[i].userCreated.lastName) {
                    createdBy = createdBy + ' ' + referral[i].userCreated.lastName;
                }

                let updatedBy = referral[i].userUpdated && referral[i].userUpdated.firstName? referral[i].userUpdated.firstName : '';
                if (referral[i].userUpdated && referral[i].userUpdated.middleName) {
                    updatedBy = updatedBy + ' ' + referral[i].userUpdated.middleName;
                }
                if (referral[i].userUpdated && referral[i].userUpdated.lastName) {
                    updatedBy = updatedBy + ' ' + referral[i].userUpdated.lastName;
                }

                const push = {
                    no: i + 1,
                    code: referral[i].code,
                    desc: referral[i].desc,
                    type: referral[i].type,
                    addedBy: createdBy,
                    updatedBy: updatedBy,
                    createdAt: referral[i].createdDate ? moment(referral[i].createdDate).format('DD/MM/YYYY HH:mm') : '',
                    updatedAt: referral[i].updatedDate ? moment(referral[i].updatedDate).format('DD/MM/YYYY HH:mm') : '',
                };

                datas.push(push);
            }
        }
        return {
            results: datas,
            total: total,
        }
    } catch (e) {
        throw e;
    }
  }

  async insert(auth: Auth, body: any) {
    try {
        await ReferralCode.createQueryBuilder('').insert()
        .values({
            code: body.code,
            type: body.type,
            desc: body.desc,
            createdBy: auth.userdata.userId.toString(),
            createdDate: moment().format('YYYY-MM-DD HH:mm:ss'),
            updatedBy: auth.userdata.userId.toString(),
            updatedDate: moment().format('YYYY-MM-DD HH:mm:ss'),
        })
        .execute();
    } catch (e) {
        throw e;
    }
  }

  async update(auth: Auth, body: any) {
    try {
        await ReferralCode.createQueryBuilder('').update()
        .set({
            type: body.type,
            desc: body.desc,
            updatedBy: auth.userdata.userId.toString(),
            updatedDate: moment().format('YYYY-MM-DD HH:mm:ss'),
        })
        .where('code = :code', { code: body.code })
        .execute();
    } catch (e) {
        throw e;
    }
  }

  
  async delete(auth: Auth, body: any) {
    try {
        await ReferralCode.createQueryBuilder('').delete()
        .where('code = :code', { code: body.code })
        .execute();
    } catch (e) {
        throw e;
    }
  }
}