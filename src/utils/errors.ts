import { HttpError } from 'routing-controllers';

export function UserNotFoundError () {
  return new HttpError(404, 'User not found!');
}
