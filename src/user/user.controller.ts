import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { createUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { returnUserDto } from './dtos/returnUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: createUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }
  @Get()
  //converte cada userEntity em userDto
  async getAllUser(): Promise<returnUserDto[]> {
    return (await this.userService.getAllUser()).map(
      (UserEntity) => new returnUserDto(UserEntity),
    );
  }
}
