import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

import { Public, RolesGuard } from 'src/jwt/jwt.guard';
import { LoginDto, RegistrationDto } from './dto/create-auth.dto';

@Controller('auth')
@ApiTags('Auth')
@UseGuards(RolesGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('register')
  async register(@Body() body: RegistrationDto) {
    return this.authService.registerUser(body);
  }

  @Public()
  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }
}
