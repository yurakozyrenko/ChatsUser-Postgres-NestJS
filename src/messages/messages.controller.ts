import {
    Controller,
    Body,
    Post,
    Get,
    Param,
    ParseIntPipe,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { Message } from './messages.model';

@ApiTags('Message')
@Controller('messages')
export class MessagesController {
    constructor(private MessagesService: MessagesService) {}

    @ApiOperation({ summary: 'Создание сообщения' })
    @ApiResponse({ status: 200, type: Message })
    @Post('/add')
    create(@Body() messageDto: CreateMessageDto) {
        return this.MessagesService.createMessage(messageDto);
    }

    @ApiOperation({ summary: 'Получить список сообщений в конкретном чате' })
    @ApiResponse({ status: 200, type: [Message] })
    @Get('/:chat')
    getAllById(@Param('chat', ParseIntPipe) chat: number) {
        return this.MessagesService.getAllMessagesById(chat);
    }
}
