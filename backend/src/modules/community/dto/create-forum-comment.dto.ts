import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateForumCommentDto {
  @ApiProperty({ example: 'Công thức hay quá, cuối tuần mình sẽ thử!' })
  @IsString()
  @MinLength(1)
  @MaxLength(2000)
  content!: string;
}