import { user, UserDocument } from '../model/userModel';
import baseController from './baseController';

class UsersController extends baseController<UserDocument> {
  constructor() {
    super(user);
  }
}

export default new UsersController();
