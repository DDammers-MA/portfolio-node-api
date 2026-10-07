import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from './user.entity.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwt: JwtService,
  ) {}

  async getUser(payload: any) {
  const user = await this.users.findOne({
    where: {
      id: payload.sub,
    },
  });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  const { password, ...result } = user;

  return result;
}

  async register(dto: RegisterDto) {
    const exists = await this.users.findOneBy({ email: dto.email });
    if (exists) throw new ConflictException('Email already registered');

    const user = await this.users.save(
      this.users.create({
        name: dto.name,
        email: dto.email,
        created_at: new Date(),
        password: await hash(dto.password, 10),
        role_id: 2, // fixed on the server, never taken from the request
      }),
    );

    return { token: await this.sign(user), user: this.publicUser(user) };
  }

  async login(dto: LoginDto) {
    // password has select:false, so ask for it explicitly
    const user = await this.users
      .createQueryBuilder('u')
      .addSelect('u.password')
      .where('u.email = :email', { email: dto.email })
      .getOne();

    // same error for "no such user" and "wrong password"
    if (!user || !(await compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.users.update(user.id, { last_login: new Date() });
    return { token: await this.sign(user) };
  }

  private sign(user: User) {
    return this.jwt.signAsync({ sub: user.id, email: user.email, role_id: user.role_id });
  }

  private publicUser(user: User) {
    const { password, ...rest } = user;
    return rest;
  }
}