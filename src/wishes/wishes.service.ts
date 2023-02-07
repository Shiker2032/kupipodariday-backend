import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { Wish } from './entity/wish.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish) private wishRepo: Repository<Wish>,
    private usersService: UsersService,
  ) {}

  async createWish(createWishDto: CreateWishDto, userData: any) {
    const user = await this.usersService.findOneByUsername(userData.username);
    const wish = this.wishRepo.create(createWishDto);
    wish.owner = user;
    return this.wishRepo.save(wish);
  }

  async getLastWishes() {
    return this.wishRepo.find({});
  }
}
