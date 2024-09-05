import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { DoesUserExist } from 'src/core/guards/does-user-exist';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(DoesUserExist)
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }
}
