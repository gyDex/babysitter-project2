import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '@prisma/client';
import { JwtAuthGuard } from './strategies/guards/jwt-auth.guard';
import { Response } from 'express';
import { UserRole } from 'generated/prisma';
import { JwtRefreshAuthGuard } from './strategies/guards/jwt-refresh-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('request-code')
    requestCode(@Body() dto: { phone: string; role: UserRole }) {
        return this.authService.requestCode(dto.phone, dto.role);
    }

    @Post('verify-code')
    async verifyCode(@Body() dto: { phone: string; code: string }, @Res() res: Response) {
        const user = await this.authService.verifyCode(dto.phone, dto.code);
        return this.authService.login(user, res, false);
    }

    @Get('get-me')
    @UseGuards(JwtRefreshAuthGuard)
    getMe(@CurrentUser() user: User) {
        return user; 
    }
        
    // @Post('login')
    // @UseGuards(LocalAuthGuard )
    // async login(
    // @CurrentUser() user: User,
    // @Res({passthrough: true}) response: Response) 
    // {   
    //     console.log(user)
    //     await this.authService.login(user, response)   
    // }

    // @Post('signout')
    // @UseGuards(JwtAuthGuard)
    // async signOut(
    //     @CurrentUser() user: User,
    //     @Res({passthrough: true}) response:Response){
    //         console.log('signout')
    //         await this.authService.signOut(user.id, response);
    // }

    @Post('refresh')
    @UseGuards(JwtRefreshAuthGuard)
    async refresh(
        @CurrentUser() user: User,
        @Res({passthrough: true}) response: Response) {
            console.log(user)
            await this.authService.login(user, response)
    }
}
