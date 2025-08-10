import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";

import { JwtAuthGuard } from "src/auth/strategies/guards/jwt-auth.guard";
import { UpdateNannyDto } from "./update-nanny.dto/update-nanny.dto";

@Controller ('users')
export class UsersController {
    constructor(private readonly usersServices: UsersService) {}

    @Get('uuid/:uuid') 
    @UseGuards(JwtAuthGuard)
    async getUserByUUID(@Req() req: any) {
        const userId = req.user.id; 
        return this.usersServices.getUserByUUID(userId);
    }

    @Get('/nanny')
    @UseGuards(JwtAuthGuard)
    async getNannyById(@Req() req: any) {
        const userId = req.user.id; 

        return this.usersServices.getNannyById(userId);
    }

    @Put('/nanny/:id')
    @UseGuards(JwtAuthGuard)
    async updateNanny(@Param('id') userId: string, @Body() req: UpdateNannyDto) {
        return this.usersServices.updateNanny(userId,req);
    }

    @Put('/parent/subscribe')
    @UseGuards(JwtAuthGuard)
    async subscribeParent(@Req() req: any) {
        const userId = req.user.id; 
        return this.usersServices.subscribeParent(userId);
    }

    @Post('/parent/vacancy')
    @UseGuards(JwtAuthGuard)
    async createVacancy(@Req() req: any, @Body() body: UpdateNannyDto) {
        const userId = req.user.id; 
        return this.usersServices.createVacancy(userId, body);
    }

    @Get('/parent/vacancy')
    @UseGuards(JwtAuthGuard)
    async getVacancy(@Req() req: any) {
        const userId = req.user.id; 
        return this.usersServices.getVacancy(userId);
    }

    @Get('/parent/vacancy/:id')
    @UseGuards(JwtAuthGuard)
    async getVacancyById(@Param('id') id: string) {
        return this.usersServices.getVacancyById(id);
    }

    @Put('/parent/vacancy/:id')
    @UseGuards(JwtAuthGuard)
    async updateVacancy(@Req() req: any, @Body() body: any) {
        const userId = req.user.id; 
        return this.usersServices.updateVacancy(userId, body);
    }

    @Put('/parent/vacancy-val/')
    @UseGuards(JwtAuthGuard)
    async validateNanny(@Req() req: any) {
        const userId = req.user.id; 
        return this.usersServices.validateNanny(userId);
    }
}