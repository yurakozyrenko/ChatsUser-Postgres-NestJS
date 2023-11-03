import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { Chat } from 'src/chats/chats.model';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    //Создать пользователя и вернуть id
    async createUser(dto: CreateUserDto) {
        let username = dto.username;
        const candidate = await this.userRepository.findOne({
            where: { username },
        });
        if (candidate) {
            throw new HttpException(
                'Пользователь с таким именем существует',
                HttpStatus.BAD_REQUEST
            );
        }
        const user = await this.userRepository.create(dto);
        return user.id;
    }

    // Проверяем существование пользователя при создании сообщения
    async getOneUser(author) {
        const data = await this.userRepository.findOne({
            where: { id: author },
        });
        if (!data) {
            throw new HttpException(
                'Автора не существует',
                HttpStatus.BAD_REQUEST
            );
        }
        return true;
    }

    // Проверяем существование пользователей при создании чата
    async getAllUsers(users) {
        const data = await this.userRepository.findAll({
            where: { id: users },
        });

        if (users.length !== data.length) {
            throw new HttpException(
                'Попытка добавить в чат несуществующих пользователей',
                HttpStatus.BAD_REQUEST
            );
        }
        return true;
    }

    // Получаем конкретного пользователя id
    async getUserById(id: number) {
        const user = await this.userRepository.findOne({
            include: Chat,
            where: { id },
        });

        if (!user) {
            throw new HttpException(
                'Пользователь не существует',
                HttpStatus.BAD_REQUEST
            );
        }

        return user;
    }
}
