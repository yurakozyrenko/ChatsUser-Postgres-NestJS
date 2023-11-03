import { Controller, Body, Post, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { User } from './users.model';

@ApiTags('User')
@Controller('users')
export class UsersController {
    constructor(private UsersService: UsersService) {}

    @ApiOperation({ summary: 'Создание пользователя' })
    @ApiResponse({ status: 200, type: User })
    @Post('/add')
    create(@Body() userDto: CreateUserDto) {
        return this.UsersService.createUser(userDto);
    }
}
