import { Controller, Req } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('signUp')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return await this.authService.auth(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('signIn')
  async signIn(@Req() req) {
    return this.authService.auth(req.user);
  }
}
