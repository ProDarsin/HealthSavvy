
const paymentCashIn = {
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

const transction={
    tags: ["Payments"],
    summary: " transction ",
    description: "transction ",
    requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
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
}
  const paymentsRoutes = {
    "/api/payments/cashin": {
      post: paymentCashIn,
    },
     "/api/payments/transaction": {
        post:transction
     },
  };

  export default paymentsRoutes