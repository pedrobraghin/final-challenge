import bcrypt from 'bcrypt';

export class PasswordUtils {
  static async hashPass(password: string): Promise<string> {
    const salt = Number(process.env.BCRYPT_SALT);
    const hashedPass = await bcrypt.hash(password, salt);
    return hashedPass;
  }

  static async comparePass(
    password: string,
    encrypted: string
  ): Promise<boolean> {
    const isValidPassword = await bcrypt.compare(password, encrypted);
    return isValidPassword;
  }
}
