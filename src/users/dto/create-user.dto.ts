import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'Yura', description: 'Имя пользователя' })
    @IsString({ message: 'Должно быть строкой' })
    @IsNotEmpty({ message: 'Не Должно быть пустым' })
    readonly username: string;
}
