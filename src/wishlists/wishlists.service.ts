import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { WishesService } from 'src/wishes/wishes.service';
import { Repository } from 'typeorm';
import { CreateWishListDto } from './dto/create-wishlist.dto';
import { Wishlist } from './entity/wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(
    private readonly wishesService: WishesService,
    private readonly usersService: UsersService,
    @InjectRepository(Wishlist) private wishlistsRepo: Repository<Wishlist>,
  ) {}

  async getAll() {
    return this.wishlistsRepo.find({});
  }

  async getById(id: number) {
    const wishList = await this.wishlistsRepo.findOne({
      where: { id },
      relations: ['owner', 'items'],
    });
    return wishList;
  }

  async create(createWishListDto: CreateWishListDto, currentUser) {
    const { itemsId, ...collectionData } = createWishListDto;
    const wishes = await this.wishesService.findWishesById(itemsId);
    const user = await this.usersService.getUserById(currentUser.id);

    return await this.wishlistsRepo.save({
      ...collectionData,
      owner: user,
      items: wishes,
    });
  }

  async deleteById(id: number) {
    return this.wishlistsRepo.delete(id);
  }
}
