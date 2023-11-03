import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { UserChats } from './user-chats.model';

@Injectable()
export class UserChatsService {
    constructor(
        @InjectModel(UserChats) private userchatsRepository: typeof UserChats
    ) {}

    // Вносим данные в таблицу Пользователь -чат
    async createUserChats(users, chatId: number) {
        for (let i: number = 0; i < users.length; i++) {
            let userId: number;
            userId = users[i];
            await this.userchatsRepository.create({ userId, chatId });
        }
    }
}
