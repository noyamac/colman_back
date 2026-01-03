import { post } from "../model/postModel";
import baseController from "./baseController";

class PostsController extends baseController {
  constructor() {
    super(post);
  }
}

export default new PostsController();
