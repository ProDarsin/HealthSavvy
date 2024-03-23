const NurseLogin = {
  tags: ["Nurse Dashboard"],
  summary: " Nurse login",
  description: "Nurse login",
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
const resetPassword = {
  tags: ["Nurse Dashboard"],
  summary: " reset  password",
  description: "reset  password",
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
const getMessage = {
  tags: ["Nurse Dashboard"],
  summary: "get message ",
  description: "get message",
  security: [
    {
      authorization: [],
    },
  ],
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
  },
};
const NurserDashboard = {
  "/api/nurse/dashboard/login": {
    post: NurseLogin,
  },
  "/api/nurse/dashboard/message": {
    get: getMessage,
  },
  "api/nurse/dashboard/resetPassword": {
    post: resetPassword,
  },
};

export default NurserDashboard;
