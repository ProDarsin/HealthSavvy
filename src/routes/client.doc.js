const registerClient = {
  tags: ["client"],
  summary: " register client  ",
  description: "register client ",
  requestBody: {
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            password: {
              type: "string",
              description: "your password",
              example: "078675236.",
            },
            firstName: {
              type: "string",
              description: "your first name ",
              example: "john",
            },
            lastName: {
              type: "string",
              description: "your last name ",
              example: "doe",
            },
            email: {
              type: "string",
              description: "email",
              example: "email@gmail.com",
            },
          },
        },
      },
    },
  },

  responses: {
    200: {
      description: "Ok",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {},
          },
        },
      },
    },
    400: {
      description: "bad request ",
    },
  },
};

const login = {
  tags: ["client"],
  summary: " log in  ",
  description: "log in  ",

  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            email: {
              type: "string",
              description: "your email ",
              example: " johndoe@gmail.com",
            },
            password: {
              type: "string",
              description: "your password ",
              example: "*****",
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "Ok",
      content: {
        "application/json": {
          schema: {
            type: "object",
          },
        },
      },
    },
  },
};

const client = {
  "/api/client/createAccount": {
    post: registerClient,
  },
  "/api/client/login": {
    post: login,
  },
};

export default client;
