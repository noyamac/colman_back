import express from "express";
import commentController from "../controllers/commentController";
import authMiddleware from "../middlewares/authMiddleware";

export const commentRouter = express.Router();

/**
 * @swagger
 * /comment:
 *   get:
 *     summary: Get all comments
 *     description: Retrieve a list of all comments, optionally filtered by postId.
 *     tags: [Comments]
 *     parameters:
 *       - in: query
 *         name: postId
 *         schema:
 *           type: string
 *         description: Filter comments by Post ID
 *         example: "69567f030f33c0ed9c5bf1cc"
 *     responses:
 *       200:
 *         description: Successfully retrieved comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
commentRouter.get("/", commentController.getAll.bind(commentController));

/**
 * @swagger
 * /comment/{id}:
 *   get:
 *     summary: Get comment by ID
 *     description: Retrieve a specific comment by its ID.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *         example: "6977c9f457348a2884b51dd4"
 *     responses:
 *       200:
 *         description: Successfully retrieved comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
commentRouter.get("/:id", commentController.getById.bind(commentController));

/**
 * @swagger
 * /comment:
 *   post:
 *     summary: Create a new comment
 *     description: Create a new comment on a post.
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: Comment successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
commentRouter.post(
  "/",
  authMiddleware,
  commentController.create.bind(commentController),
);

/**
 * @swagger
 * /comment/{id}:
 *   delete:
 *     summary: Delete a comment
 *     description: Delete an existing comment by ID.
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *         example: "6977c9f457348a2884b51dd4"
 *     responses:
 *       200:
 *         description: Comment successfully deleted
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
commentRouter.delete(
  "/:id",
  authMiddleware,
  commentController.delete.bind(commentController),
);

/**
 * @swagger
 * /comment/{id}:
 *   put:
 *     summary: Update a comment
 *     description: Update an existing comment by ID.
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *         example: "6977c9f457348a2884b51dd4"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: Comment successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
commentRouter.put(
  "/:id",
  authMiddleware,
  commentController.update.bind(commentController),
);
