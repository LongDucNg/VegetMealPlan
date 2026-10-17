import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { UserRole, UserStatus } from '../entities/user.entity';

export class UpdateMemberStatusDto {
  @ApiProperty({ enum: UserStatus, example: UserStatus.LOCKED })
  @IsEnum(UserStatus, { message: 'status chỉ nhận active hoặc locked' })
  status: UserStatus;
}

export class UpdateMemberRoleDto {
  @ApiProperty({ enum: UserRole, example: UserRole.ADMIN })
  @IsEnum(UserRole, { message: 'role chỉ nhận admin hoặc authorized' })
  role: UserRole;
}
