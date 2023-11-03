import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './chats.model';
import { CreateChatDto } from './dto/create-chat.dto';
import { Injectable } from '@nestjs/common';
import { UserChatsService } from '../user-chats/user-chats.service';
import { UsersService } from 'src/users/users.service';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class ChatsService {
    constructor(
        @InjectModel(Chat) private chatRepository: typeof Chat,
        private userchatsService: UserChatsService,
        private usersService: UsersService
    ) {}

    //Создание чата
    async createChat(dto: CreateChatDto) {
        await this.usersService.getAllUsers(dto.users);
        const candidate = await this.chatRepository.findOne({
            where: { name: dto.name },
        });
        if (candidate) {
            throw new HttpException(
                'Чат с таким именем существует',
                HttpStatus.BAD_REQUEST
            );
        }
        const chat = await this.chatRepository.create({ ...dto });
        await this.userchatsService.createUserChats(dto.users, chat.id);
        return chat.id;
    }

    // Проверка существования чата
    async getOneChat(chat) {
        const candidate = await this.chatRepository.findOne({
            where: { id: chat },
        });
        if (!candidate) {
            throw new HttpException(
                'Чат не существует',
                HttpStatus.BAD_REQUEST
            );
        }
        return candidate;
    }

    // Получить список чатов конкретного пользователя id
    async getChatById(id: number) {
        const chat = await this.usersService.getUserById(id);
        return chat;
    }
}
