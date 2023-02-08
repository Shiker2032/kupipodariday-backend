import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { User } from './users/entity/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { WishesModule } from './wishes/wishes.module';
import { Wish } from './wishes/entity/wish.entity';
import { WishlistsModule } from './wishlists/wishlists.module';
import { Wishlist } from './wishlists/entity/wishlist.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      database: 'kupipodariday',
      username: 'student',
      password: 'student',
      entities: [User, Wish, Wishlist],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    WishesModule,
    WishlistsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
