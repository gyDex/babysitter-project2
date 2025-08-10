import { IsNotEmpty } from 'class-validator';

export class CreateUserDto 
{
    @IsNotEmpty({ message: 'First name is required' })
    firstName: string;
}