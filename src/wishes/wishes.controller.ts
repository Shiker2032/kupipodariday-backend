import { Body, Controller, Req, UseGuards } from '@nestjs/common';
import { Get, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateWishDto } from './dto/create-wish.dto';

import { WishesService } from './wishes.service';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createWishDto: CreateWishDto, @Req() req) {
    return await this.wishesService.createWish(createWishDto, req.user);
  }

  @Get('/last')
  async getLastWishes() {
    return await this.wishesService.getLastWishes();
  }

  @Get('/top')
  async getTopWishes() {
    return await this.wishesService.getLastWishes();
  }
}
