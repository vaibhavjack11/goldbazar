import { PartialType } from '@nestjs/mapped-types';
import { RegistrationDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(RegistrationDto) {}
