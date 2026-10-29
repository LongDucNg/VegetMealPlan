import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorCode } from '../../common/constants/error-codes.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification, NotificationType } from './entities/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
  ) {}

  async create(params: {
    user_id: number;
    type: NotificationType;
    title: string;
    message: string;
    ref_type?: string;
    ref_id?: number;
  }): Promise<Notification> {
    const notification = this.notificationRepo.create({ ...params, is_read: false });
    return this.notificationRepo.save(notification);
  }

  async listForUser(user_id: number): Promise<Notification[]> {
    return this.notificationRepo.find({ where: { user_id }, order: { created_at: 'DESC' } });
  }

  /** Chỉ chủ thông báo mới đánh dấu được; id của người khác trả 404 như không tồn tại. */
  async markRead(user_id: number, notification_id: number): Promise<void> {
    const result = await this.notificationRepo.update({ notification_id, user_id }, { is_read: true });
    if (!result.affected) {
      throw new NotFoundException({
        code: ErrorCode.RESOURCE_NOT_FOUND,
        message: 'Không tìm thấy thông báo',
      });
    }
  }
}
