import { InjectModel } from '@nestjs/sequelize';
import { Message } from './messages.model';
import { CreateMessageDto } from './dto/create-message.dto';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ChatsService } from 'src/chats/chats.service';

@Injectable()
export class MessagesService {
    constructor(
        @InjectModel(Message) private messageRepository: typeof Message,
        private usersService: UsersService,
        private chatsService: ChatsService
    ) {}

    // Создаем собщение в чат от Пользователя
    async createMessage(dto: CreateMessageDto) {
        await this.chatsService.getOneChat(dto.chat);
        await this.usersService.getOneUser(dto.author);
        const message = await this.messageRepository.create({ ...dto });
        return message.id;
    }

    // Получить список сообщений в конкретном чате
    async getAllMessagesById(chat) {
        await this.chatsService.getOneChat(chat);
        const messages = await this.messageRepository.findAll({
            include: { all: true },
            where: { chat },
            order: [['createdAt', 'DESC']],
        });
        return messages;
    }
}
