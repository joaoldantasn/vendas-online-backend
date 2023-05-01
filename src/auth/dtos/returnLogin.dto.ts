import { returnUserDto } from 'src/user/dtos/returnUser.dto';

export interface ReturnLogin {
  user: returnUserDto;
  accessToken: string;
}
