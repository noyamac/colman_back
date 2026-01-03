import { comment } from "../model/commentModel";
import baseController from "./baseController";

class CommentsController extends baseController {
  constructor() {
    super(comment);
  }
}

export default new CommentsController();
