import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateChatDto {
    @IsString({ message: 'Должно быть строкой' })
    @IsNotEmpty({ message: 'Не Должно быть пустым' })
    @ApiProperty({ example: 'Соседи', description: 'Имя чата' })
    readonly name: string;

    @IsArray({ message: 'Должно быть массивом' })
    @ApiProperty({
        example: [1, 2],
        description: '[1, 2]',
    })
    readonly users: number;
}
