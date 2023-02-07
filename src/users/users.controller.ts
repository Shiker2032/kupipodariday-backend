import { Controller, Param } from '@nestjs/common';
import { Get, Req, UseGuards } from '@nestjs/common/';
import { Body, Patch, Post } from '@nestjs/common/decorators';

import { JwtGuard } from 'src/auth/jwt.guard';

import { UpdateUserDto } from './dto/update-user.dto';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  async getUser(@Req() req) {
    return req.user;
  }
  @UseGuards(JwtGuard)
  @Get(':username')
  async getByUsername(@Param('username') username: string) {
    return await this.usersService.findOneByUsername(username);
  }
  @UseGuards(JwtGuard)
  @Patch('me')
  async updateUser(@Req() req, @Body() updateUserdto: UpdateUserDto) {
    return await this.usersService.updateUser(req.id, updateUserdto);
  }
  @UseGuards(JwtGuard)
  @Get('me/wishes')
  async getActiveUserWishes(@Req() req) {
    const result = await this.usersService.getActiveUserWishes(
      req.user.username,
    );
    return result;
  }

  @Get(':username/wishes')
  async getUserWishs(@Param('username') username: string) {
    const result = await this.usersService.getActiveUserWishes(username);
    return result;
  }

  @Post('find')
  async searchForUser(@Body() searchQuery: any) {
    const result = await this.usersService.searchForUser(searchQuery.query);
    return result;
  }
}
