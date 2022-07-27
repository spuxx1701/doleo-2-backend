import { BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';

/**
 * Validates an object and throws a BAD_REQUEST http exception if the validation fails.
 * @param object
 */
export async function validateOrThrow(object: any): Promise<any> {
  const validationErrors = await validate(object);
  if (validationErrors.length > 0) {
    throw new BadRequestException(validationErrors);
  }
  return true;
}
