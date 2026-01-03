import { post, PostDocument } from "../model/postModel";
import baseController from "./baseController";

class PostsController extends baseController<PostDocument> {
  constructor() {
    super(post);
  }
}

export default new PostsController();
