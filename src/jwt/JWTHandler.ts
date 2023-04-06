import jwt, { JwtPayload } from 'jsonwebtoken';

interface TokenPayload extends JwtPayload {
  id: string;
}

export class JWTHandler {
  static generateToken(id: string) {
    const jwtSecret = String(process.env.JWT_SECRET);
    const jwtExpiresIn = String(process.env.JWT_EXPIRES_IN);
    const token = jwt.sign({ id }, jwtSecret, { expiresIn: jwtExpiresIn });
    return token;
  }

  static validateToken(token: string): TokenPayload | null {
    try {
      const jwtSecret = String(process.env.JWT_SECRET);
      const isValidToken = jwt.verify(token, jwtSecret) as TokenPayload;
      return isValidToken;
    } catch (err) {
      return null;
    }
  }
}
