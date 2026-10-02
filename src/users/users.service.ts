import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity.js';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {


    constructor(@InjectRepository(User) private readonly users: Repository<User>) {}

 async create(dto: CreateUserDto) {
    const exists = await this.users.findOneBy({ email: dto.email });
    if (exists) throw new ConflictException('Email already registered');

    const saved = await this.users.save(
      this.users.create({ ...dto, password: await hash(dto.password, 10) }),
    );

    const { password, ...item } = saved; // never return the hash
    return { item };
  }
  findAll() {
    return `This action returns all users`;
  }

    async findById(id: number) {
    // password has select:false, so it isn't returned
    const user = await this.users.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
