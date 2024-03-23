const DoctorLogin = {
  tags: ["Doctor Dashboard"],
  summary: " Doctor login",
  description: "Doctor login",

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
  tags: ["Doctor Dashboard"],
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
  tags: ["Doctor Dashboard"],
  summary: " get message",
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
const DoctorDashboard = {
  "/api/doctor/dashboard/login": {
    post: DoctorLogin,
  },
  "/api/doctor/dashboard/message": {
    get: getMessage,
  },
  "/api/doctor/dashboard/resetPassword": {
    post: resetPassword,
  },
};

export default DoctorDashboard;
