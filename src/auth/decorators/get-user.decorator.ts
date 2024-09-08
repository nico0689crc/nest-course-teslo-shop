import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      throw new InternalServerErrorException('User not found.');
    }

    return user;
  },
);
