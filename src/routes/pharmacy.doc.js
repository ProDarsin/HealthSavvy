const PharmacyLogin = {
  tags: ["Pharmacy Dashboard"],
  summary: " Pharmacy login",
  description: "Pharmacy login",
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
  tags: ["Pharmacy Dashboard"],
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
const registerMedicine = {
  tags: ["Pharmacy Dashboard"],
  summary: " register Medicine",
  description: "register Medicine",
  security: [
    {
      authorization: [],
    },
  ],
  requestBody: {
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            medicineName: {
              type: "string",
              description: "your medicine name ",
              example: "Amoxicillin.",
            },
            medicineId: {
              type: "string",
              description: "your medicine id ",
              example: "fka643gs62",
            },
            quantity: {
              type: "string",
              description: "quantity",
              example: "fka643gs62",
            },
            description: {
              type: "string",
              description: "medicine description",
              example: "expire date :2024",
            },
            disease: {
              type: "array",
              items: {
                type: "string",
              },
              description: "disease",
            },
            categories: {
              type: "string",
              description: "disease",
              example: " ",
            },
            medicineImage: {
              type: "file",
              description: "medicine image",
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
const getMedicine = {
  tags: ["Pharmacy Dashboard"],
  summary: " get all Medicine",
  description: "get all Medicine",
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
const getMedicineById = {
  tags: ["Pharmacy Dashboard"],
  summary: " get  Medicine By Id ",
  description: "get  Medicine By Id",
  security: [
    {
      authorization: [],
    },
  ],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "medicine id ",
      type: "ObjectId",
      example: "63d926a5f4bd9dc5a83758d1",
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
    400: {
      description: "medicine is not found",
    },
  },
};
const deleteMedicineByID = {
  tags: ["Pharmacy Dashboard"],
  summary: " delete  Medicine By Id ",
  description: "delete  Medicine By Id",
  security: [
    {
      authorization: [],
    },
  ],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "medicine id ",
      type: "ObjectId",
      example: "63d926a5f4bd9dc5a83758d1",
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
    400: {
      description: "medicine is not found",
    },
  },
};
const updateMedicineByID = {
  tags: ["Pharmacy Dashboard"],
  summary: " update  Medicine By Id ",
  description: "update  Medicine By Id",
  security: [
    {
      authorization: [],
    },
  ],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "medicine id ",
      type: "ObjectId",
      example: "63d926a5f4bd9dc5a83758d1",
    },
  ],
  requestBody: {
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            medicineName: {
              type: "string",
              description: "your medicine name ",
              example: "Amoxicillin.",
            },
            medicineId: {
              type: "string",
              description: "your medicine id ",
              example: "fka643gs62",
            },
            quantity: {
              type: "string",
              description: "quantity",
              example: "fka643gs62",
            },
            description: {
              type: "string",
              description: "medicine description",
              example: "expire date :2024",
            },
            disease: {
              type: "array",
              items: {
                type: "string",
              },
              description: "disease",
            },
            categories: {
              type: "string",
              description: "categories",
              example: " ",
            },
            medicineImage: {
              type: "file",
              description: "medicine image",
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
      description: "medicine is not found",
    },
  },
};
const PharmacyDashboard = {
  "/api/pharmacy/dashboard/login": {
    post: PharmacyLogin,
  },
  "/api/pharmacy/dashboard/medicine": {
    get: getMedicine,
    post: registerMedicine,
  },
  "/api/pharmacy/dashboard/medicine/{id}": {
    delete: deleteMedicineByID,
    patch: updateMedicineByID,
    get: getMedicineById,
  },
  "/api/pharmacy/dashboard/resetPassword": {
    post: resetPassword,
  },
};

export default PharmacyDashboard;
