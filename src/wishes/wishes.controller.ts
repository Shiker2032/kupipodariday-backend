import {
  Body,
  Controller,
  Delete,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Get, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateWishDto } from './dto/create-wish.dto';
import { WishesService } from './wishes.service';

@UseGuards(AuthGuard('jwt'))
@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  async create(@Body() createWishDto: CreateWishDto, @Req() req) {
    return await this.wishesService.createWish(
      createWishDto,
      req.user.username,
    );
  }

  @Get('/last')
  async getLastWishes() {
    return await this.wishesService.getLastWishes();
  }

  @Get('/top')
  async getTopWishes() {
    return await this.wishesService.getTopWishes();
  }

  @Get(':id')
  async getWishbyId(@Param('id') id: number) {
    return await this.wishesService.getWishById(id, ['owner']);
  }

  @Delete(':id')
  async deleteWishById(@Param('id') id: number, @Req() currentUser) {
    return await this.wishesService.deleteWishById(id, currentUser);
  }

  @Post(':id/copy')
  async copyWish(@Param('id') id: number, @Req() req) {
    return this.wishesService.copyWish(id, req.user);
  }
}
