import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { getAuth } from '../helpers/auth.helper';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor() { }

  async use(req: any, res: any, next: any) {
    try {
      const authorization = req.header('Authorization') || req.query.access_token;
      if (!authorization) {
        throw new HttpException({ message: 'Required Access Token.' }, HttpStatus.UNAUTHORIZED);
      }
      const auth = await getAuth(authorization);
      req.auth = auth;
      next();
    } catch (e) {
      throw new HttpException( e.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
