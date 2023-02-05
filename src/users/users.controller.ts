import { Controller } from '@nestjs/common';
import { Get, Req, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getUser(@Req() req) {
    return req.user;
  }
}
