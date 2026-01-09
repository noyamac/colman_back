import { comment, CommentDocument } from "../model/commentModel";
import baseController from "./baseController";

class CommentsController extends baseController<CommentDocument> {
  constructor() {
    super(comment);
  }
}

export default new CommentsController();
