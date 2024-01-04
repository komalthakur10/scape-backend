import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageBody } from './dto/message.dto';
import { MessageHistoryBody } from './dto/message-history.dto';
import { Types } from 'mongoose';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Post('/')
  async create(@Body() messageBody: MessageBody) {
    try {
      return this.messageService.create(messageBody);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Post('/history')
  async find(@Body() messageHistoryBody: MessageHistoryBody) {
    try {
      messageHistoryBody.receiver = [
        ...messageHistoryBody.receiver,
        messageHistoryBody.sender,
      ];
      messageHistoryBody.receiver.forEach((it: any) => {
        it = new Types.ObjectId(it);
      });
      const filters = {
        receiver: { $in: messageHistoryBody.receiver },
        sender: { $in: messageHistoryBody.receiver },
      };
      return this.messageService.find(filters);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Get('/:id')
  async findOne(@Param() id: string) {
    try {
      return this.messageService.fetchLastMsgList(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
