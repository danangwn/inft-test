import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { DatabaseModule } from './modules/database/database.module';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { ReferralController } from './controllers/referral.controller';
import { ReferralService } from './services/referral.service';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [
    UserController,
    ReferralController,
  ],
  providers: [
    UserService,
    ReferralService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
      .exclude(
        {
          path: '/users/register',
          method: RequestMethod.POST,
        },
        {
          path: '/users/login',
          method: RequestMethod.POST,
        },
      )
      .forRoutes(
        UserController,
        ReferralController,
      );
  }
}
