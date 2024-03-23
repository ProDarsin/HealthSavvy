const approved = {
    tags: ["Payments"],
    summary: " Payments  cashin",
    description: "Payments cashin",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              number: {
                type: "string",
                description: "your number",
              },
              amount: {
                type: "number",
                description: "amount ",
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