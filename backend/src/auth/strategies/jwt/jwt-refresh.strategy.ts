import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
)
{
    constructor(
        configService: ConfigService,
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    console.log('🍪 Cookies in JWT strategy:', request.cookies); 
                    return request.cookies?.Refresh
            }]),
            secretOrKey: configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
            passReqToCallback: true,
        })
    }

    async validate(request: Request, payload: { userId: string}) {
        return this.authService.verifyUserRefreshToken(
            request.cookies?.Refresh,
            payload.userId,
        )
    }
}