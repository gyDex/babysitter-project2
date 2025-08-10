import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";

import { UpdateUserDto } from "./update-user.dto/update-user-dto";
import { ConfigService } from "@nestjs/config";
import { JSDOM } from 'jsdom';

const createDOMPurify = require('dompurify');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);
@Injectable()
export class UsersService {
    

  constructor(
    private readonly prisma: PrismaService,        
    private readonly configService: ConfigService,
  ) {}

    async getNannyById(id: string) {
        try {
            const nanny = await this.prisma.user.findFirst({
                where: {
                    id: id,
                },
                include: {
                    nannyProfile: true
                }
            })

            if (nanny === undefined) {
                throw new NotFoundException('Nanny profile not found!');
            }

            return nanny;
        } catch (error) {
            console.log(error)

            if (error.code === '42P01') {
                throw new InternalServerErrorException('Database configuration error');
            }

            throw new InternalServerErrorException('An unexpected error occurred');
        }
    }

    async validateNanny(id: string) {
        try {
            const nanny = await this.prisma.nannyProfile.update({
                where: {
                    userId: id,
                },
                data: {
                    isValidated: true,
                },
                include: {
                    user: true
                }
            })

            if (nanny === undefined) {
                throw new NotFoundException('Nanny profile not found!');
            }

            return nanny;
        } catch (error) {
            if (error.code === '42P01') {
                throw new InternalServerErrorException('Database configuration error');
            }

            throw new InternalServerErrorException('An unexpected error occurred');
        }
    }

    async getVacancyById(id: string) {
        try {
            const vacancy = await this.prisma.vacancy.findFirst({
                where: {
                    id: id
                },
                include: {
                    childrens: true,
                    parent: {
                        include: {
                            user: true
                        }
                    },
                    responses: true
                }
            })

            if (!vacancy) {
                throw new NotFoundException('Vacancy not found!');
            }

            return vacancy;

        } catch (error) {

            if (error.code === '42P01') {
                throw new InternalServerErrorException('Database configuration error');
            }

            throw new InternalServerErrorException('An unexpected error occurred');
        }
    }

    async getVacancy(userId: string) {
        try {
            const parent = await this.prisma.user.findFirst({
                where: {
                    id: userId
                },
                include: {
                    parentProfile: true
                }
            })

            if (!parent?.parentProfile?.id) {
                throw new NotFoundException('Parent profile not found!');
            }

            const items = await this.prisma.vacancy.findMany({
                where: {
                    parentId: parent.parentProfile.id,
                },
                include: {
                    parent: {
                        include: {
                            user: true
                        }
                    },
                    childrens: true
                }
            })

            console.log('items',items)


            if (!items) {
                throw new NotFoundException('Vacancies not found!');
            }

            return items;
        } catch (error) {
            console.log(error)
            if (error.code === '42P01') {
                throw new InternalServerErrorException('Database configuration error');
            }

            throw new InternalServerErrorException('An unexpected error occurred');
        }
    }

    async updateVacancy(userId: string, body: any)
    {
        try {
            const parent = await this.prisma.user.findFirst({
                where: {
                    id: userId
                },
                include: {
                    parentProfile: true
                }
            })

            if (body.contacts !== undefined && body.contacts.email !== undefined && body.contacts.name !== undefined && body.contacts.residency !== undefined) {
                await this.prisma.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        email: body.contacts.email,
                        fullName: body.contacts.name,
                        residency: body.contacts.residency,
                    },
                    include: {
                        parentProfile: true
                    }
                })
            }

            console.log(parent)

            if (parent?.parentProfile?.id === undefined) {
                throw new NotFoundException('Parent profile not found!');
            }

            const existingVacancy = await this.prisma.vacancy.findFirst({
                    where: {
                        parentId: parent?.parentProfile.id
                    },
                    include: {
                        childrens: true
                    }
                });

                if (!existingVacancy) {
                    throw new NotFoundException('Vacancy not found for update');
                }

                console.log(body)

                let updateData: any = body?.data;

                if (body?.data?.childrens) {
                    const { childrens, ...otherData } = body.data;
                        updateData = {
                            ...otherData,
                        }

                        if (childrens !== undefined && childrens !== null) {
                                await this.prisma.children.deleteMany({
                                    where: {
                                        vacId: existingVacancy.id
                                    }
                                });

                            updateData.childrens = {
                                create: childrens
                            };
                        }
                };
                    
                const updatedVacancy = await this.prisma.vacancy.update({
                    where: {
                        id: existingVacancy.id
                    },
                    data: updateData,
                    include: {
                        childrens: true,
                        parent: true,
                        responses: true
                    }
                });

                return updatedVacancy;
        } catch (error) {
            console.log(error)

            if (error.code === '42P01') {
                throw new InternalServerErrorException('Database configuration error');
            }

            throw new InternalServerErrorException('An unexpected error occurred');
        }
    }

    async createVacancy(userId: string, body: any) {
        try {
            const parent = await this.prisma.user.findFirst({
                where: {
                    id: userId
                },
                include: {
                    parentProfile: true
                }
            })

            await this.prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    email: body.contacts.email,
                    fullName: body.contacts.name,
                    residency: body.contacts.residency,
                },
                include: {
                    parentProfile: true
                }
            })

            if (!parent?.parentProfile?.id) {
                throw new NotFoundException('Parent profile not found!');
            }

            const { childrens, ...otherData } = body.data;

            const vacancy = await this.prisma.vacancy.create({
                data: {
                    parent: {
                        connect: {
                            id: parent?.parentProfile?.id,
                        }
                    },
                    childrens: {
                        create: childrens,
                    },
                    ...otherData
                },
                include: {
                    childrens: true,
                    parent: true,
                    responses: true
                }
            })

            
            if (parent === null || parent === undefined) {
                throw new NotFoundException('Parent not found!')
            }

            return vacancy;
        } catch (error) {
            console.log(error)

            if (error.code === '42P01') {
                throw new InternalServerErrorException('Database configuration error');
            }

            throw new InternalServerErrorException('An unexpected error occurred');
        }
    }

    async subscribeParent(id: string) {
        try {
            const subExpirationMs = parseInt(
                this.configService.getOrThrow('JWT_REFRESH_TOKEN_EXPIRATION_MS'),
            );

            const data = {
                expiresAt: new Date(Date.now() + subExpirationMs)
            }

            const updatedUser = await this.prisma.user.update({
                where: { id },
                data: {
                    parentProfile: {
                    upsert: {
                        update: {
                        subscribe: {
                            upsert: {
                            update: {
                                expiresAt: data.expiresAt, // продлить на 7 дней
                            },
                            create: {
                                expiresAt: data.expiresAt,
                            },
                            },
                        },
                        },
                        create: {
                        subscribe: {
                            create: {
                            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                            },
                        },
                        },
                    },
                    },
                },
                include: {
                    parentProfile: {
                    include: {
                        subscribe: true,
                    },
                    },
                },
            });

            return updatedUser;
        } catch (error) {
            console.error('Update parent error:', error);

            if (error.code === '42P01') {
                throw new InternalServerErrorException('Database configuration error');
            }

            throw new InternalServerErrorException('An unexpected error occurred');
        }
    }

    async getUserByUUID(id: string) {
        try {
            const user = await this.prisma.user.findFirst(
                {
                    where: {
                        uuid: id
                    }
                }
                
            )

            if (user === undefined || user === null) {
                throw new NotFoundException('User not found');
            }

            return user;
        } catch (error) {

            if (error.code === '42P01') {
                throw new InternalServerErrorException('Database configuration error');
            }
            throw new InternalServerErrorException('An unexpected error occurred');
        }
    }

    async updateNanny(id: string, data: any) {
        try {
            console.log(data)
            if (data.nanny?.jobs) {
                data.nanny.jobs = DOMPurify.sanitize(data.nanny.jobs);
            }

            if (data.nanny?.education) {
                data.nanny.education = DOMPurify.sanitize(data.nanny.jobs);
            }

            if (data.nanny?.about) {
                data.nanny.about = DOMPurify.sanitize(data.nanny.jobs);
            }

            const updatedUser = await this.prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    ...data.user,
                    nannyProfile: {
                    upsert: {
                        update: {...data.nanny},
                        create: {...data.nanny}
                    },
                    },
                },
                include: {
                    nannyProfile: true,
                },
            });

            return updatedUser;
        } catch (error) {
            console.error('Update nanny error:', error);

            if (error.code === '23505') {
            throw new ConflictException('Email already exists');
            }

            if (error.code === '42P01') {
            throw new InternalServerErrorException('Database configuration error');
            }

            throw new InternalServerErrorException('An unexpected error occurred');
        }
    }

    async getUserById(id:string) {
        try {
            const user = await this.prisma.user.findFirst(
                {
                    where: {
                        id: id
                    },

                    include: {
                        nannyProfile:true,
                        parentProfile: {
                            include: {
                                subscribe: true
                            }
                        }
                    }
                }
            )

            if (user === undefined || user === null) {
                throw new NotFoundException('User not found');
            }

            return user;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            if (error.code === '42P01') {
                throw new InternalServerErrorException('Database configuration error');
            }
            console.log(error)
            throw new InternalServerErrorException('An unexpected error occurred');
        }
    }

    async getUserByEmail(email:string) {
        try {
            const user = await this.prisma.user.findFirst(
                {
                    where: {
                        email: email
                    }
                }
            )
            console.log(user)

            if (user === undefined || user === null) {
                throw new NotFoundException('User not found');
            }

            return user;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }

            if (error.code === '42P01') {
                throw new InternalServerErrorException('Database configuration error');
            }

            console.error(error);
            throw new InternalServerErrorException('An unexpected error occurred');
        }
    }

    async updateUser(id: string, updateData: UpdateUserDto) {
        try {

            const updatedUser = await this.prisma.user.update(
                {
                    where: {
                        id: id,
                    },
                    data: updateData,
                }
            )

            if (updatedUser === null || updatedUser === undefined) {
                throw new NotFoundException('User not found!')
            }

            return updatedUser;
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Email already exists');
            }

            if (error.code === '42P01') {
                throw new InternalServerErrorException('Database configuration error');
            }

            throw new InternalServerErrorException('An unexpected error occurred');
        }
    }
}