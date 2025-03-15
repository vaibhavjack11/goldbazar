
import {
  IsString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  MinLength
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserType } from 'src/types';

export class RegistrationDto {
  @ApiProperty({
    default: 'John Doe'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    default: 'john.doe@example.com'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    default: 'test@123'
  })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    default: UserType.CUSTOMER
  })
  @IsEnum(UserType)
  @IsNotEmpty()
  type: UserType;
}


export class LoginDto {
  @ApiProperty({
    default: 'john.doe@example.com'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    default: 'test@123'
  })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
