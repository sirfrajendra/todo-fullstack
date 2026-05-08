import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  create(
    dto: CreateTodoDto,
    userId: number,
  ) {
    return this.prisma.todo.create({
      data: {
        title: dto.title,
        userId,
      },
    });
  }

  getTodos(userId: number) {
    return this.prisma.todo.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  updateTodo(
    id: number,
    dto: UpdateTodoDto,
    userId: number,
  ) {
    return this.prisma.todo.update({
      where: {
        id,
        userId,
      },
      data: {
        completed: dto.completed,
      },
    });
  }

  deleteTodo(id: number, userId: number) {
    return this.prisma.todo.delete({
      where: {
        id,
        userId,
      },
    });
  }
}