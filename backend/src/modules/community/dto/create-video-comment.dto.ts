import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateVideoCommentDto {
  @ApiProperty({
    example: 'Công thức này rất ngon và dễ làm, cảm ơn tác giả!',
    description: 'Nội dung bình luận (không rỗng, tối đa 2000 ký tự)',
  })
  @IsString()
  @IsNotEmpty({ message: 'Nội dung bình luận không được để trống' })
  @MaxLength(2000, { message: 'Nội dung bình luận tối đa 2000 ký tự' })
  content!: string;
}
