import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UserDocument } from './user.schema';
import { UserBody } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user')
    private UserModel: Model<UserDocument>,
  ) {}

  create(userBody: UserBody) {
    return this.UserModel.create(userBody);
  }
  findOne(id: string) {
    const userid = new mongoose.Types.ObjectId(id);
    return this.UserModel.findById(userid);
  }
}
