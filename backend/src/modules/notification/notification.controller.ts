import { ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { PositiveIntPipe } from '../../common/pipes/positive-int.pipe';
import { NotificationService } from './notification.service';

@ApiBearerAuth()
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  list(@CurrentUser('user_id') userId: number) {
    return this.notificationService.listForUser(userId);
  }

  @Patch('read-all')
  markAllRead(@CurrentUser('user_id') userId: number) {
    return this.notificationService.markAllRead(userId);
  }

  @Patch(':id/read')
  markRead(@CurrentUser('user_id') userId: number, @Param('id', PositiveIntPipe) id: number) {
    return this.notificationService.markRead(userId, id);
  }

  @Delete('all')
  deleteAll(@CurrentUser('user_id') userId: number) {
    return this.notificationService.deleteAll(userId);
  }

  @Delete(':id')
  delete(@CurrentUser('user_id') userId: number, @Param('id', PositiveIntPipe) id: number) {
    return this.notificationService.delete(userId, id);
  }
}
