import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { SmsService } from 'src/sms/sms.service';
import { Response } from 'express';
import { User, UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly configService: ConfigService,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly smsService: SmsService,
    ) {}

    generateCode(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    async requestCode(phone: string, role: string) {
        let roles;

        if (role === 'PARENT') {
            roles = UserRole.PARENT; 
        }
        else {
            roles = UserRole.NANNY;
        }

        let user = await this.prisma.user.findUnique({
            where: { phone },
        });

        if (!user) {
                user = await this.prisma.user.create({
                data: {
                    phone,
                    roles: [roles],
                    ...(role === 'PARENT'
                    ? {
                        parentProfile: {
                            create: {
                                
                            },
                        },
                        }
                    : {
                        nannyProfile: {
                            create: {
                                isValidated: false,
                            },
                        },
                        }),
                },
                include: {
                    nannyProfile: true,
                    parentProfile: true,
                },
                });
        } else if (!user.roles.includes(roles)) {
                // Если пользователь существует, но роли нет — добавляем роль
                user = await this.prisma.user.update({
                where: { phone },
                data: {
                    roles: roles
                },
            });
        }

        const code = this.generateCode(); // например, 6-значный код
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 мин

        await this.prisma.oTPCode.create({
            data: {
            code,
            userId: user.id,
            expiresAt,
            },
        });

        // await this.smsService.send(phone, `Ваш код: ${code}`);

        // return { message: `Код отправлен успешно` };
        return { message: `Ваш код: ${code}` };
    }

    async login(user: User, res: Response, redirect:boolean = false) {
        try {

            const expirationMs = parseInt(
                this.configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRATION_MS'),
            );
            const refreshExpirationMs = parseInt(
                this.configService.getOrThrow('JWT_REFRESH_TOKEN_EXPIRATION_MS'),
            );

            const expiresAccessToken = new Date(Date.now() + expirationMs);
            const expiresRefreshToken = new Date(Date.now() + refreshExpirationMs);

            const tokenPayload = {
                userId: user.id,
                roles: user.roles,
            }

            const accessToken = this.jwtService.sign(tokenPayload, {
                secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
                expiresIn: `${this.configService.getOrThrow(
                    'JWT_ACCESS_TOKEN_EXPIRATION_MS',
                )}ms`
            })

            const refreshToken = this.jwtService.sign(tokenPayload, {
                secret: this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
                expiresIn: `${this.configService.getOrThrow(
                'JWT_REFRESH_TOKEN_EXPIRATION_MS',
                )}ms`,
            });

            const userData = {
                ...user
            }

            // if (redirect) {
            //     const redirectUrl = new URL(
            //     this.configService.getOrThrow('AUTH_UI_REDIRECT'),
            //     );
            //     redirectUrl.searchParams.append('userId', user.uuid);
            //     return res.redirect(redirectUrl.toString());
            // }


            await this.usersService.updateUser(user.id, {
                refreshToken: await hash(refreshToken, 10)
            })

            res.cookie('Authentication', accessToken, {
                httpOnly: true,
                secure: true,
                // secure: this.configService.get('NODE_ENV') === 'production',
                expires: expiresAccessToken,
                path: '/', 
                sameSite: 'none',
                domain: 'localhost',
            });

            console.log('Setting Authentication cookie:', accessToken);
            console.log(res.cookie);

            res.cookie('Refresh', refreshToken, {
                httpOnly: true,
                // secure: this.configService.get('NODE_ENV') === 'production',
                secure: true,
                expires: expiresRefreshToken,
                path: '/', 
                sameSite: 'none',
                domain: 'localhost',
            })

            return res.json(userData);
        } catch (error) {
            throw new UnauthorizedException(
                'Failed to process login. Please try again.',
            );
        }
    }

    async verifyUserRefreshToken(refreshToken: string, userId: string
    ): Promise<Omit<User, 'password'>>
    {
        try {
            const user = await this.usersService.getUserById(userId) as User;
            const refreshTokenMathes = await compare(refreshToken, user.refreshToken as string);
            if (!refreshTokenMathes) {
                throw new UnauthorizedException();
            }

            return user;
        } catch (error) {
            console.log(error)
           throw new UnauthorizedException('Refresh token is not valid') 
        }    
    }

    async verifyCode(phone: string, code: string) {
        const user = await this.prisma.user.findUnique({ where: { phone } });
        if (!user) throw new NotFoundException('Пользователь не найден');

        const otp = await this.prisma.oTPCode.findFirst({
            where: {
            userId: user.id,
            code,
            used: false,
            expiresAt: { gte: new Date() },
            },
            orderBy: { createdAt: 'desc' },
        });

        if (!otp) throw new BadRequestException('Неверный или просроченный код');

        await this.prisma.oTPCode.update({
            where: { id: otp.id },
            data: { used: true },
        });

        await this.prisma.user.update({
            where: { id: user.id },
            data: { isVerified: true }, // Убедись, что поле есть в модели
        });

        return user;

        // return this.login(user, res);
    }


    // async verifyUser(email: string, password: string) {
    //     try {
            
    //         const user = await this.usersService.getUserByEmail(email)
    //         const authed = await compare(password, user.password);

    //         if (!authed) {
    //             throw new UnauthorizedException();
    //         }

    //         return user;
    //     } catch (error) {
    //         console.log(error)

    //         throw new UnauthorizedException('Credentials are not valid')
    //     }
    // }

    // async signOut(userId: string, response: Response) {
    //     try {
    //         await this.usersService.updateUser(userId, {
    //             refreshToken: null
    //         })

    //         response.clearCookie('Authentication')
    //         response.clearCookie('Refresh')

    //         response.status(200).json({
    //             message: 'Successfully signed out',
    //         })  
    //     } catch (error) {
    //         console.log(error)

    //         throw new UnauthorizedException('Failed to process sign out');
    //     }
    // }
}
