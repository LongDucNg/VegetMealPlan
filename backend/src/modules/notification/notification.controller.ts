import { Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NotificationService } from './notification.service';

@UseGuards(AuthGuard('jwt'))
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  list(@Req() req: any) {
    return this.notificationService.listForUser(req.user.user_id);
  }

  @Patch(':id/read')
  markRead(@Param('id') id: string) {
    return this.notificationService.markRead(Number(id));
  }
}
