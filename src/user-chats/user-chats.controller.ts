import { Controller } from '@nestjs/common';
import { UserChatsService } from './user-chats.service';

@Controller('userchats')
export class UserChatsController {
    constructor(private UserChatsService: UserChatsService) {}

    create(userId, chatId) {
        return this.UserChatsService.createUserChats(userId, chatId);
    }
}
