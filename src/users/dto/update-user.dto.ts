import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(1, 64)
  username: string;

  @IsOptional()
  @IsString()
  @Length(2, 64)
  password: string;

  @IsOptional()
  @IsUrl()
  avatar: string;

  @IsOptional()
  @IsString()
  @Length(0, 200)
  about: string;
}
