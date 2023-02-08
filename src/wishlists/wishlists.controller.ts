import { Controller, Get } from '@nestjs/common';
import {
  Body,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common/decorators';
import { JwtGuard } from 'src/auth/jwt.guard';
import { CreateWishListDto } from './dto/create-wishlist.dto';
import { WishlistsService } from './wishlists.service';
@UseGuards(JwtGuard)
@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get()
  async getWishlists() {
    return await this.wishlistsService.getAll();
  }

  @Get(':id')
  async getWishList(@Param('id') id: number) {
    return await this.wishlistsService.getById(id);
  }

  @Post()
  async createWishList(
    @Body() createWishListDto: CreateWishListDto,
    @Req() req,
  ) {
    return await this.wishlistsService.create(createWishListDto, req.user);
  }

  @Delete(':id')
  async deleteWishList(@Param('id') id: number) {
    return await this.wishlistsService.deleteById(id);
  }
}
