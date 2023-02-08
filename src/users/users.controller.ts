import { Controller, Param } from '@nestjs/common';
import { Get, Req, UseGuards } from '@nestjs/common/';
import { Body, Patch, Post } from '@nestjs/common/decorators';
import { JwtGuard } from 'src/auth/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getUser(@Req() req) {
    return await this.usersService.getUserById(req.user.id);
  }

  @Get(':username')
  async getByUsername(@Param('username') username: string) {
    return await this.usersService.getUserByUsername(username);
  }

  @Get('me/wishes')
  async getActiveUserWishes(@Req() req) {
    const result = await this.usersService.getUserById(req.user.id, ['wishes']);
    return result.wishes;
  }

  @Get(':username/wishes')
  async getUserWishs(@Param('username') username: string) {
    const result = await this.usersService.getUserByUsername(username, [
      'wishes',
    ]);

    return result.wishes;
  }

  @Patch('me')
  async updateUser(@Req() req, @Body() updateUserdto: UpdateUserDto) {
    return await this.usersService.updateUser(req.user.id, updateUserdto);
  }

  @Post('find')
  async searchForUser(@Body() searchQuery: any) {
    const result = await this.usersService.searchForUsers(searchQuery.query);
    return result;
  }
}
