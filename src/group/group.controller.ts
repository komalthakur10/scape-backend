import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { MessageService } from 'src/message/message.service';
import { Types } from 'mongoose';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('group')
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly messageService: MessageService,
  ) {}

  @Post('/newgroup')
  create(@Body() createGroupDto: CreateGroupDto) {
    try {
      return this.groupService.create(createGroupDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/group-list/:id')
  async findById(@Param() id: string) {
    try {
      return await this.groupService.fetchGroupList(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/group-info/:id')
  async findByGroupId(@Param('id') id: string) {
    try {
      return await this.groupService.getGroupInfo(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  // @Get()
  // findAll() {
  //   return this.groupService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.groupService.findOne(+id);
  // }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    // async update(updateGroupDto: UpdateGroupDto) {
    // return this.groupService.update(+id, updateGroupDto);
    try {
      return await this.groupService.update(id, updateGroupDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/group-messages/:id')
  async getGroupMessages(@Param('id') id: string) {
    try {
      const foundGroup = this.groupService.findOne({ _id: id });
      if (!foundGroup) {
        throw new HttpException('Group not found', HttpStatus.BAD_REQUEST);
      }

      return this.messageService.find({ groupId: new Types.ObjectId(id) });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Get('/search-group/:grpname')
  async findByUsername(@Param('grpname') grpname: string) {
    try {
      return await this.groupService.findByGrpName(grpname);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
