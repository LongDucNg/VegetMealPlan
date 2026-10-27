import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

export class VotePostDto {
  @ApiProperty({
    example: 'up',
    description: "Loại bình chọn: 'up' (đồng tình), 'down' (phản đối), hoặc null (hủy bình chọn)",
    nullable: true,
    enum: ['up', 'down', null],
  })
  @IsIn(['up', 'down', null], {
    message: "Giá trị vote phải là 'up', 'down' hoặc null",
  })
  vote!: 'up' | 'down' | null;
}
