import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

@Injectable() 
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        configService: ConfigService,
        private readonly usersService: UsersService,
    ) {
        super({
        jwtFromRequest: ExtractJwt.fromExtractors([
            (req: Request): string | null => {
            if (!req?.cookies || !req.cookies.Authentication) {
                console.warn('🚫 Authentication cookie missing');
                return null;
            }

            console.log('✅ Access token found in cookie');
            return req.cookies.Authentication;
            }
        ]),
        ignoreExpiration: false,
        secretOrKey: configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
        });
    }

    async validate(payload: { userId: string }) 
    {
        try {
            console.log('JWT payload:', payload);
            const user = await this.usersService.getUserById(payload.userId);
            console.log(user);

            return user;
        } catch (err) {
            console.error('validate error:', err);
            throw err;
        }
    }
}