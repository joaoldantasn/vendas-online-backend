import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { returnUserDto } from 'src/user/dtos/returnUser.dto';
import { AuthService } from './auth.service';
import { LogintDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async login(@Body() loginDto: LogintDto): Promise<returnUserDto> {
    return new returnUserDto(await this.authService.login(loginDto));
  }
}
