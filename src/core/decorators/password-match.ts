import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function PasswordMatch(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'passwordMatch',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const relatedValue = (args.object as any)[args.constraints[0]];
          return (
            typeof value === 'string' &&
            typeof relatedValue === 'string' &&
            value === relatedValue
          );
        },
        defaultMessage() {
          return 'Confirm password must match Password';
        },
      },
    });
  };
}
