const feedback = {
  tags: ["FeedBack"],
  summary: "feedback routes",
  description: "feedback routes",
  requestBody: {
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            firstName: {
              type: "string",
              description: "name",
              example: "ndungutse",
            },
            lastName: {
              type: "string",
              description: "name",
              example: "darsin",
            },
            message: {
              type: "string",
              description: "leave message",
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
const getFeedBack={
    tags: ["FeedBack"],
    summary: "feedback routes",
    description: "feedback routes",
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
}
const message = {
  "/api/feedback/": {
    post: feedback,
    get: getFeedBack,
  },
};
export default message;
