import { IsString, MinLength } from 'class-validator';

export class MessageFromClientDto {
  @IsString()
  @MinLength(1)
  message: string;

  @IsString()
  @MinLength(1)
  fullName: string;
}
