import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
  const req = ctx.switchToHttp().getRequest();
  const [type, token] = (req.headers.authorization ?? '').split(' ');
  console.log('auth header:', req.headers.authorization);

  if (type !== 'Bearer' || !token) throw new UnauthorizedException();

  try {
    req.user = await this.jwt.verifyAsync(token);
    return true;
  } catch (e) {
    console.log('jwt error:', (e as Error).message);
    throw new UnauthorizedException();
  }
}
}