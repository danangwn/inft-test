import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { responseError, response } from '../helpers/response.helper';
import { Auth } from '../interfaces/auth.dto';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) { }

  @Post('register')
  async register(@Body() params: any) {
    try {
      const result = await this.userService.newRegister(params);
      return response(result);
    } catch (e) {
      return responseError(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Post('login')
  async login(@Body() body: any) {
    try {
      return await this.userService.login(body);
    } catch (e) {
      return responseError(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Post('logout')
  async logout(@Req() req) {
    try {
      const auth: Auth = req.auth;
      return await this.userService.logout(auth);
    } catch (e) {
      return responseError(e.message, HttpStatus.UNAUTHORIZED);
    }
  }
}

