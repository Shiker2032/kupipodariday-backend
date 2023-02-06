import { Controller, Param } from '@nestjs/common';
import { Get, Req, UseGuards } from '@nestjs/common/';
import { Body, Patch } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getUser(@Req() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':username')
  async getByUsername(@Param('username') username: string) {
    return await this.usersService.findOneByUsername(username);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('me')
  async updateUser(@Req() req, @Body() updateUserdto: UpdateUserDto) {
    return await this.usersService.updateUser(req.id, updateUserdto);
  }
}
