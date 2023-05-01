import { IsString } from 'class-validator';

export class LogintDto {
  @IsString()
  email: string;
  @IsString()
  password: string;
}
