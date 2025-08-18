import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
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

    // Parent

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

    // Nanny

    @Get('/nanny/profile')
    @UseGuards(JwtAuthGuard)
    async getNanny(@Req() req: any) {
        const userId = req.user.id; 
        return this.usersServices.getNannyProfileById(userId);
    }


    @Get('/nanny')
    @UseGuards(JwtAuthGuard)
    async getParentNannyById(@Query('id') id: string) {
        return this.usersServices.getNannyById(id);
    }

    @Get('/nanny/city')
    @UseGuards(JwtAuthGuard)
    async getAllNannyByCity(@Query('city') city: string) {
        return this.usersServices.getNannyByCity(city);
    }

    @Get('/nanny/:id')
    @UseGuards(JwtAuthGuard)
    async getNannyById(@Param('id') id: any) {
        return this.usersServices.getNannyById(id);
    }

    @Put('/nanny/:id')
    @UseGuards(JwtAuthGuard)
    async updateNanny(@Param('id') userId: string, @Body() req: UpdateNannyDto) {
        return this.usersServices.updateNanny(userId,req);
    }

    @Get('/nanny-sim')
    @UseGuards(JwtAuthGuard)
    async getSimNanny(@Query('id') id: string, @Req() req: any) {
        const userId = req.user.id; 
        return this.usersServices.getSimNanny(id, userId);
    }

    @Get('/nanny/vacancy/city')
    async validateNanny(@Req() req: any, @Query('city') city: string) {
        return this.usersServices.getVacancyByCity(city);
    }
    
    @Post('/nanny/request')
    @UseGuards(JwtAuthGuard)
    async createRequest(@Body() body: any) {
        return this.usersServices.createRequest(body);
    }

    @Post('/nanny/respond')
    @UseGuards(JwtAuthGuard)
    async respond(@Body() body: any) {
        return this.usersServices.respond(body.data.userId, body.data.vacId, body.data.message);
    }

    // City

    @Put('/city')
    @UseGuards(JwtAuthGuard)
    async changeCity(@Body() body: any, @Req() req: any) {
        const userId = req.user.id; 
        return this.usersServices.changeCity(body.city, userId);
    }
}