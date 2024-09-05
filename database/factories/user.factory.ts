import { User, UserRole } from 'src/auth/entities/user.entity';
import { generateStringNumeric, hash } from 'src/core/helpers';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(User, async (faker) => {
  const user = new User();

  user.email = faker.internet.email();
  user.firstName = faker.person.firstName();
  user.lastName = faker.person.lastName();
  user.confirmationCode = await hash(generateStringNumeric(6));
  user.emailVerified = true;
  user.emailVerifiedAt = new Date();
  user.password = await hash('password');
  user.role = UserRole.USER_REGULAR;

  user.passwordResetToken = null;
  user.passwordResetTokenReqAt = null;
  return user;
});
