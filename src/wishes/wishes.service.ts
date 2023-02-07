import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.wishRepo.find({ order: { createdAt: 'desc' }, take: 40 });
  }

  async getTopWishes() {
    return this.wishRepo.find({ order: { copied: 'desc' }, take: 10 });
  }

  async getWishById(id: number) {
    // const wish = await this.wishRepo.findOneBy({ id });
    const wish = this.wishRepo.findOne({ where: { id }, relations: ['owner'] });
    if (!wish) {
      throw new NotFoundException();
    }
    return wish;
  }

  async deleteWishById(id: number) {
    const wish = await this.wishRepo.findOneBy({ id });
    console.log(wish);
    if (!wish) {
      throw new NotFoundException();
    }

    return this.wishRepo.delete({ id });
  }
}
