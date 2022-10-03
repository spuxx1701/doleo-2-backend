import * as bcrypt from 'bcrypt';

export const saltRounds = 10;

/**
 * Hashes a password and returns the encrypted value.
 * @param plain The plain value.
 * @returns The hashed value.
 */
export async function hash(plain: string) {
  const hashed = await bcrypt.hash(plain, saltRounds);
  return hashed;
}

/**
 * Compares a plain string against a hash.
 * @param plain The plain value.
 * @param hash The hash.
 * @returns Whether the hashes match.
 */
export async function compare(plain: string, hash: string) {
  const result = await bcrypt.compare(plain, hash);
  return result;
}
