import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  create(dto: CreateCategoryDto, adminId: number): Promise<Category> {
    const category = this.categoryRepo.create({ ...dto, created_by: adminId });
    return this.categoryRepo.save(category);
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepo.find();
  }

  async findOne(category_id: number): Promise<Category> {
    const category = await this.categoryRepo.findOne({ where: { category_id } });
    if (!category) throw new NotFoundException(`Category #${category_id} not found`);
    return category;
  }

  async update(category_id: number, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(category_id);
    Object.assign(category, dto);
    return this.categoryRepo.save(category);
  }

  async remove(category_id: number): Promise<void> {
    const category = await this.findOne(category_id);
    await this.categoryRepo.remove(category);
  }
}
