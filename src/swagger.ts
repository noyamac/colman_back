import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Posts & Comments REST API',
      version: '1.0.0',
      description:
        'A REST API for managing posts and comments with user authentication',
      contact: {
        name: 'Yarin and Noya',
        email: 'email@example.com',
      },
    },
    servers: [
      {
        url: process.env.BASE_URL || 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Post: {
          type: 'object',
          required: ['sender', 'imageUrl', 'date'],
          properties: {
            _id: {
              type: 'string',
              description: 'Post unique identifier',
              example: '69567f030f33c0ed9c5bf1cc',
            },
            sender: {
              type: 'string',
              description: 'The username of the user that uploaded the post',
              example: 'Israel',
            },
            imageUrl: {
              type: 'string',
              description: 'A URL for the post image',
              example: 'imageurl.jpg',
            },
            description: {
              type: 'string',
              description: 'The description of the post',
              example: 'A post description',
            },
            date: {
              type: 'string',
              format: 'date-time',
              description: 'The date in which the post was posted',
              example: '2026-01-01T13:31:41.786Z',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message',
              example: 'An error occurred',
            },
            status: {
              type: 'number',
              description: 'HTTP status code',
              example: 400,
            },
          },
        },
      },
      responses: {
        NotFoundError: {
          description: 'The specified resource was not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
              example: {
                message: 'Resource not found',
                status: 404,
              },
            },
          },
        },
        ServerError: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
              example: {
                message: 'Internal server error',
                status: 500,
              },
            },
          },
        },
      },
    },
  },
  apis: [
    './src/routes/*.ts',
    './src/controllers/*.ts',
    './dist/src/routes/*.js',
    './dist/src/controllers/*.js',
  ],
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
