import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { ErrorCode } from '../../common/constants/error-codes.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification, NotificationType } from './entities/notification.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class NotificationService implements OnModuleInit {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }

  async onModuleInit() { }

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

  /**
   * Bắn thông báo đến tất cả các tài khoản Admin trong hệ thống
   */
  async notifyAdmins(params: {
    type: NotificationType;
    title: string;
    message: string;
    ref_type?: string;
    ref_id?: number;
  }): Promise<void> {
    try {
      const admins = await this.userRepo.find({
        where: [{ role: 'admin' }, { role: 'ADMIN' as any }],
      });
      if (admins.length > 0) {
        const notis = admins.map((admin) =>
          this.notificationRepo.create({
            user_id: admin.user_id,
            type: params.type,
            title: params.title,
            message: params.message,
            ref_type: params.ref_type,
            ref_id: params.ref_id,
            is_read: false,
          }),
        );
        await this.notificationRepo.save(notis);
      }
    } catch (err) {
      console.warn('[NotificationService] notifyAdmins failed:', err);
    }
  }

  /**
   * Tự động khởi tạo thông báo ban đầu vào PostgreSQL nếu người dùng chưa có thông báo nào
   */
  async seedInitialNotificationsForUser(user_id: number): Promise<void> {
    try {
      const count = await this.notificationRepo.count({ where: { user_id } });
      if (count > 0) return;

      const items: Partial<Notification>[] = [];


      for (const item of items) {
        const noti = this.notificationRepo.create(item as Notification);
        await this.notificationRepo.save(noti);
      }
    } catch (err) {
      console.warn('[NotificationService] seedInitialNotificationsForUser error:', err);
    }
  }

  async listForUser(user_id: number): Promise<Notification[]> {
    const list = await this.notificationRepo.find({
      where: { user_id },
      order: { created_at: 'DESC' },
    });
    if (list.length === 0) {
      await this.seedInitialNotificationsForUser(user_id);
      return this.notificationRepo.find({
        where: { user_id },
        order: { created_at: 'DESC' },
      });
    }
    return list;
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

  /** Đánh dấu tất cả thông báo của người dùng là đã đọc */
  async markAllRead(user_id: number): Promise<void> {
    await this.notificationRepo.update({ user_id, is_read: false }, { is_read: true });
  }

  /** Xoá một thông báo */
  async delete(user_id: number, notification_id: number): Promise<void> {
    const result = await this.notificationRepo.delete({ notification_id, user_id });
    if (!result.affected) {
      throw new NotFoundException({
        code: ErrorCode.RESOURCE_NOT_FOUND,
        message: 'Không tìm thấy thông báo',
      });
    }
  }

  /** Xoá tất cả thông báo của người dùng */
  async deleteAll(user_id: number): Promise<void> {
    await this.notificationRepo.delete({ user_id });
  }
}
