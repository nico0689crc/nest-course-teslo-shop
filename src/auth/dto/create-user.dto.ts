import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { PasswordMatch } from 'src/core/decorators/password-match';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,100}$/,
    {
      message:
        'Your password must be 8 to 100 characters long and contain at least two uppercase letters (A-Z), One special character (!@#$&*), Two digits (0-9) and Three lowercase letters (a-z)',
    },
  )
  password: string;

  @PasswordMatch('password')
  passwordConfirmation: string;
}
