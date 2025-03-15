import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { ResponseMessgaes } from 'src/constants';
import { User } from 'src/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @Inject(forwardRef(() => JwtService)) private readonly jwt: JwtService
  ) {}

  private getTokenizedResponse(person: any) {
    const user = {
      id: person.id,
      name: person.name,
      email: person.email,
      type: person.type
    };
    const payload = {
      user
    };

    const token: string = this.jwt.sign(payload);
    return {
      token,
      user
    };
  }

  async registerUser(body: any) {
    const existingUser = await this.userModel.findOne({
      where: { email: body.email }
    });

    if (existingUser) {
      throw new HttpException(
        ResponseMessgaes.auth.registered,
        HttpStatus.CONFLICT
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await this.userModel.create({
      ...body,
      password: hashedPassword
    });

    return this.getTokenizedResponse(user);
  }
 
  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ where: { email },raw:true });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    if (!user.password) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new BadRequestException('Invalid credentials');
    return this.getTokenizedResponse(user);
  }
}
