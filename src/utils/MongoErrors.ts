import { MongoError } from 'mongodb';

interface ResolvedError {
  message: string;
  statusCode: number;
}

export class MongoErrors {
  static resolveMongoError(err: MongoError): ResolvedError {
    // regex to filter the field name in mongo error message
    const pattern = /{([^:]+):/i;
    const field = err.errmsg.match(pattern);
    let key: string = '';

    if (field) {
      key = field[1].trim();
    }

    const error: ResolvedError = {} as ResolvedError;

    switch (err.code) {
      case 11000:
        error.message = `'${key}' already exists. Please login or create an account with other ${key}.`;
        error.statusCode = 400;
        break;
      default:
        console.error(err);
        error.message = 'Something went wrong. Please try again later.';
        error.statusCode = 500;
    }
    return error;
  }
}
