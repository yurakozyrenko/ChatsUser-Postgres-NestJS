import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMessageDto {

    @IsNumber({}, { message: 'Должно быть числом' })
    @IsNotEmpty({ message: 'Не Должно быть пустым' })
    @ApiProperty({ example: '1', description: 'chatID' })
    readonly chat: number;

    @IsNumber({}, { message: 'Должно быть числом' })
    @IsNotEmpty({ message: 'Не Должно быть пустым' })
    @ApiProperty({ example: '1', description: 'userID' })
    readonly author: number;

    @IsNotEmpty({ message: 'Не Должно быть пустым' })
    @ApiProperty({ example: 'Hello', description: 'Текст' })
    readonly text: string;
}
