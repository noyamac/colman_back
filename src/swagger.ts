import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth, Comments, Posts and Users REST API",
      version: "1.0.0",
      description:
        "A REST API for managing auth,  comments, posts and with users user authentication",
      contact: {
        name: "Yarin and Noya",
        email: "email@example.com",
      },
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          required: ["username", "email", "password"],
          properties: {
            _id: {
              type: "string",
              description: "User unique identifier",
              example: "6977d0a0241c94cf5b34e32e",
            },
            username: {
              type: "string",
              description: "User display name",
              example: "JohnDoe",
            },
            email: {
              type: "string",
              description: "User email address",
              example: "johndoe@example.com",
            },
            password: {
              type: "string",
              description: "User password",
              example: "password123",
            },
            profilePicture: {
              type: "string",
              description: "URL to profile picture",
              example: "profile.jpg",
            },
          },
        },
        Comment: {
          type: "object",
          required: ["postId", "content", "sender"],
          properties: {
            _id: {
              type: "string",
              description: "Comment unique identifier",
              example: "6977c9f457348a2884b51dd4",
            },
            postId: {
              type: "string",
              description: "ID of the post this comment belongs to",
              example: "69567f030f33c0ed9c5bf1cc",
            },
            sender: {
              type: "string",
              description: "ID of the user who made the comment",
              example: "6977d0a0241c94cf5b34e32e",
            },
            content: {
              type: "string",
              description: "The comment text",
              example: "This is a great post!",
            },
            date: {
              type: "string",
              format: "date-time",
              description: "Creation date",
              example: "2026-01-01T13:31:41.786Z",
            },
          },
        },
        Post: {
          type: "object",
          required: ["sender", "imageUrl", "date"],
          properties: {
            _id: {
              type: "string",
              description: "Post unique identifier",
              example: "69567f030f33c0ed9c5bf1cc",
            },
            sender: {
              type: "string",
              description: "The username of the user that uploaded the post",
              example: "Israel",
            },
            imageUrl: {
              type: "string",
              description: "A URL for the post image",
              example: "imageurl.jpg",
            },
            description: {
              type: "string",
              description: "The description of the post",
              example: "A post description",
            },
            date: {
              type: "string",
              format: "date-time",
              description: "The date in which the post was posted",
              example: "2026-01-01T13:31:41.786Z",
            },
          },
        },
        Auth: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              description: "User email",
              example: "johndoe@example.com",
            },
            password: {
              type: "string",
              description: "User password",
              example: "password123",
            },
          },
        },
        Tokens: {
          type: "object",
          properties: {
            token: {
              type: "string",
              description: "JWT Access Token",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
            refreshToken: {
              type: "string",
              description: "JWT Refresh Token",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Error message",
              example: "An error occurred",
            },
            status: {
              type: "number",
              description: "HTTP status code",
              example: 400,
            },
          },
        },
      },
      responses: {
        NotFoundError: {
          description: "The specified resource was not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
              example: {
                message: "Resource not found",
                status: 404,
              },
            },
          },
        },
        ServerError: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
              example: {
                message: "Internal server error",
                status: 500,
              },
            },
          },
        },
      },
    },
  },
  apis: [
    "./src/routes/*.ts",
    "./src/controllers/*.ts",
    "./dist/src/routes/*.js",
    "./dist/src/controllers/*.js",
  ],
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
