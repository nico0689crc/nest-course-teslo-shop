import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { DoesUserExist } from 'src/core/guards/does-user-exist';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.docorator';
import { GetUser } from './decorators/get-user.decorator';
import { RoleProtected } from './decorators/role-protected.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { User, UserRole } from './entities/user.entity';
import { GetUserRoleGuard } from './guards/get-user-role.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(DoesUserExist)
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  async privateRoute(@GetUser() user: User) {
    return user;
  }

  // @SetMetadata('roles', [UserRole.USER_ADMINISTRATOR])
  @Get('private-administrator')
  @RoleProtected(UserRole.USER_ADMINISTRATOR)
  @UseGuards(AuthGuard(), GetUserRoleGuard)
  async privateAdministratorRoute(@GetUser() user: User) {
    return user;
  }

  @Get('private-administrator-2')
  @Auth(UserRole.USER_ADMINISTRATOR)
  async privateAdministratorRoute2(@GetUser() user: User) {
    return user;
  }
}
