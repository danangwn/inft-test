import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Query, Req } from "@nestjs/common";
import { createPaginationOptions } from "src/helpers/pagination.helper";
import { response, responseError, responsePage } from "src/helpers/response.helper";
import { Auth } from "src/interfaces/auth.dto";
import { ReferralService } from "src/services/referral.service";

@Controller('referral')
export class ReferralController {

  constructor(
    private readonly referralService: ReferralService,
  ) { }

  @Get('listing')
  async listing(@Req() req, @Query() params: any) {
    try {
      const code: string = params.search;
      const pagination = createPaginationOptions(req);
      const result =  await this.referralService.listing(code, pagination);
      return responsePage(result.results, result.total, pagination);
    } catch (e) {
      return responseError(e.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('insert')
  async insert(@Req() req, @Body() body: any) {
    try {
        const auth: Auth = req.auth;
        const result = await this.referralService.insert(auth, body);
        return response('Success Insert Data', result);
    } catch (e) {
      return responseError(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Put('update')
  async update(@Req() req, @Body() body: any) {
    try {
        const auth: Auth = req.auth;
        const result = await this.referralService.update(auth, body);
        return response('Success Update Data', result);
    } catch (e) {
      return responseError(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Delete('delete')
  async delete(@Req() req, @Body() body: any) {
    try {
        const auth: Auth = req.auth;
        const result = await this.referralService.delete(auth, body);
        return response('Success Delete Data', result);
    } catch (e) {
      return responseError(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
