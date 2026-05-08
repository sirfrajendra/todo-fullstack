import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { TodosService } from './todos.service';

import { JwtGuard } from '../auth/guard/jwt.guard';

import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
@UseGuards(JwtGuard)
export class TodosController {
  constructor(
    private todosService: TodosService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateTodoDto,
    @Req() req,
  ) {
    return this.todosService.create(
      dto,
      req.user.userId,
    );
  }

  @Get()
  getTodos(@Req() req) {
    return this.todosService.getTodos(
      req.user.userId,
    );
  }

  @Patch(':id')
  updateTodo(
    @Param('id') id: string,
    @Body() dto: UpdateTodoDto,
    @Req() req,
  ) {
    return this.todosService.updateTodo(
      Number(id),
      dto,
      req.user.userId,
    );
  }

  @Delete(':id')
  deleteTodo(
    @Param('id') id: string,
    @Req() req,
  ) {
    return this.todosService.deleteTodo(
      Number(id),
      req.user.userId,
    );
  }
}