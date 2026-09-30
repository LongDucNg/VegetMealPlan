import { Injectable } from '@nestjs/common';
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

  /** Tranh gui trung: check da co notification loai nay cho ref nay chua truoc khi tao moi. */
  async existsFor(ref_type: string, ref_id: number, type: NotificationType): Promise<boolean> {
    const found = await this.notificationRepo.findOne({ where: { ref_type, ref_id, type } });
    return !!found;
  }

  async listForUser(user_id: number): Promise<Notification[]> {
    return this.notificationRepo.find({ where: { user_id }, order: { created_at: 'DESC' } });
  }

  async markRead(notification_id: number): Promise<void> {
    await this.notificationRepo.update({ notification_id }, { is_read: true });
  }
}
