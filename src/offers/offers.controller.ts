import { Controller } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import {
  Get,
  Post,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import {
  Body,
  Req,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { JwtGuard } from 'src/auth/jwt.guard';
import { OffersService } from './offers.service';

@UseGuards(JwtGuard)
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}
  @Get()
  async getAllOffers() {
    return await this.offersService.getAll();
  }

  @Get(':id')
  async getOfferById(@Body('id') id: number) {
    return await this.offersService.getById(id);
  }

  @Post()
  async createOffer(@Body() createOfferDto: any, @Req() currentUser) {
    return await this.offersService.create(currentUser.user, createOfferDto);
  }
}
