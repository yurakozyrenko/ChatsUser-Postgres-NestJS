import {
    Controller,
    Body,
    Post,
    Get,
    Param,
    ParseIntPipe,
} from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatsService } from './chats.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { Chat } from './chats.model';

@ApiTags('Chat')
@Controller('chats')
export class ChatsController {
    constructor(private ChatsService: ChatsService) {}

    @ApiOperation({ summary: 'Создание чата' })
    @ApiResponse({ status: 200, type: Chat })
    @Post('/add')
    create(@Body() chatDto: CreateChatDto) {
        return this.ChatsService.createChat(chatDto);
    }

    @ApiOperation({
        summary: 'Получить список чатов конкретного пользователя id',
    })
    @ApiResponse({ status: 200, type: Chat })
    @Get('/:id')
    getByName(@Param('id', ParseIntPipe) id: number) {
        return this.ChatsService.getChatById(id);
    }
}
