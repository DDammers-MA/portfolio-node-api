import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';

@Controller()
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  @Post('login')
  @HttpCode(200) // login isn't creating a resource, so 200 instead of 201
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

   @Get('user')
  @UseGuards(JwtAuthGuard)
  getUser(@Req() req: any) {
    return this.auth.getUser(req.user);
  }
}