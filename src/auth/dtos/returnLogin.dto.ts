import { returnUserDto } from '../../user/dtos/returnUser.dto';

export interface ReturnLogin {
  user: returnUserDto;
  accessToken: string;
}
