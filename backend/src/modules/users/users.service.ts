import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, BmiCategory } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findOne(user_id: number): Promise<User> {
    const user = await this.userRepo.findOne({ where: { user_id } });
    if (!user) throw new NotFoundException(`User #${user_id} not found`);
    return user;
  }

  /**
   * Cập nhật height/weight rồi TÍNH LẠI bmi + bmi_category ở server.
   * Edge case bắt buộc (BR): height_cm <= 0 hoặc weight_kg <= 0 -> reject,
   * KHÔNG lưu, KHÔNG tính bmi giả.
   */
  async updateBodyMetrics(
    user_id: number,
    height_cm: number,
    weight_kg: number,
  ): Promise<User> {
    if (height_cm === undefined || height_cm <= 0) {
      throw new BadRequestException('height_cm phải lớn hơn 0');
    }
    if (weight_kg === undefined || weight_kg <= 0) {
      throw new BadRequestException('weight_kg phải lớn hơn 0');
    }

    const user = await this.findOne(user_id);
    const height_m = height_cm / 100;
    const bmi = Number((weight_kg / (height_m * height_m)).toFixed(2));

    user.height_cm = height_cm;
    user.weight_kg = weight_kg;
    user.bmi = bmi;
    user.bmi_category = this.classifyBmi(bmi);
    user.bmi_updated_at = new Date();

    return this.userRepo.save(user);
  }

  private classifyBmi(bmi: number): BmiCategory {
    if (bmi < 18.5) return BmiCategory.UNDERWEIGHT;
    if (bmi < 25) return BmiCategory.NORMAL;
    if (bmi < 30) return BmiCategory.OVERWEIGHT;
    return BmiCategory.OBESE;
  }
}
