import { IsString } from 'class-validator';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  about: string;

  @IsOptional()
  avatar: string;
}
