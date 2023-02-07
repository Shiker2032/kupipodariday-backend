import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hash,
    });

    return this.userRepository.save(user);
  }

  async findOneByUsername(username: string) {
    return await this.userRepository.findOne({ where: { username } });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    const updatedUser = updateUserDto;

    if (updatedUser.password) {
      updatedUser.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    return this.userRepository.update(user, updatedUser);
  }

  async getActiveUserWishes(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['wishes'],
    });
    return user.wishes;
  }

  async getUserWishs(username: string) {
    const user = await this.userRepository.find({
      where: { username },
      relations: ['wishes'],
    });
    return user;
  }

  async searchForUser(query: string) {
    const user = await this.userRepository.find({
      where: { username: query },
    });
    return user;
  }
}
