import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accesstoken } from 'src/models/accesstoken';
import { ReferralCode } from 'src/models/referralCode';
import { User } from 'src/models/user';
 
/**
 * Install dependencies: npm install --save @nestjs/typeorm typeorm cockroachdb
 */
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.db',
      entities: [User, Accesstoken, ReferralCode],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
