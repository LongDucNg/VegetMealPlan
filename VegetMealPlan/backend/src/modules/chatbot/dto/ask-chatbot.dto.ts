import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AskChatbotDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsOptional()
  @IsString()
  session_id?: string; // bắt buộc nếu là Unauthorized User
}
