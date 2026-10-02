import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

const ADMIN_ROLE_ID = 1; // change to whatever your admin role id is


@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}



  @Get()
async me(@Req() req: any) {
  const user = await this.usersService.findById(req.user.sub);
  return { ...user, role: user.role_id === ADMIN_ROLE_ID ? 'admin' : 'user' };
}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

   @Post()
  create(@Req() req: any, @Body() dto: CreateUserDto) {
    if (req.user.role_id !== ADMIN_ROLE_ID) {
      throw new ForbiddenException();
    }
    return this.usersService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
