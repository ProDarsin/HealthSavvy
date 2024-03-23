let pharmacy = [
  {
    pharmacyName: "Ubwiza Pharmacy",
    pharmacistName: " cloude",
    phoneNumber: "07893478",
    location: {
      province: "musaze",
      district: "rubavu",
      address: "5352hs",
      street: "kk234",
    },
    password: "pass",
    email: "johndoe@gmail.com",
    profileImage:
      "https://res.cloudinary.com/dzxupsizh/image/upload/v1678115692/ayzqxvl0qszljeob0fti.pdf",
    pharmacyImage:
      "https://res.cloudinary.com/dzxupsizh/image/upload/v1678115691/dfqup52nmd9jhn8jjpfl.pdf",
    license:
      "https://res.cloudinary.com/dzxupsizh/image/upload/v1678115689/inmmztjph3dghuxksjay.pdf",
  },
];
let hospital = [
  {
    location: {
      province: "kigali",
      district: "kicukiro",
      street: "kk 568 st",
    },
    _id: "63fcf26e96747848b6ba24e0",
    hospitalName: "CHUK",
    specialization: ["hearth, lungs"],
    phoneNumber: "078546372",
    license:
      "https://res.cloudinary.com/dzxupsizh/image/upload/v1677521508/n2pmltinoqhmkyaxwc8j.pdf",
    email: "ubwiza@gmail.com",
    password: "$2a$10$OCNp4FbQLN9/PBSKV4lIfO/49BR3Ger9U2nfo9ApIAz.Tr93fL.Q6",
    hospitalImage:
      "https://res.cloudinary.com/dzxupsizh/image/upload/v1677521509/bskjhh5dgjmef8njky3j.pdf",
    date: "2023-02-27T18:11:58.386Z",
    __v: 0,
  },
  {
    _id: "6401b2f69d34660a65c7e3e7",
    specialization: ["amaso", "igifu"],
    date: "2023-03-03T08:42:30.959Z",
    __v: 0,
  },
];
let doctor = [
  {
    location: {
      province: "kigali",
      district: "kicukiro",
      street: "kk 56st",
    },
    _id: "63ff2e17648dd13074a9c6dd",
    firstName: "ngabo",
    lastName: "lewis",
    role: "Doctor",
    phoneNumber: "0785654",
    license:
      "https://res.cloudinary.com/dzxupsizh/image/upload/v1677667855/qy3tc5intko2oq7siov9.pdf",
    specialization: [" heart,eye"],
    ProfileImage:
      "https://res.cloudinary.com/dzxupsizh/image/upload/v1677667862/s7kwqz31mwdktmm0f2q1.jpg",
    date: "2023-03-01T10:51:03.570Z",
    __v: 0,
  },
];
let nurse = [
  {
    location: {
      province: "kigali",
      district: "gasabo",
      street: "kk352st",
    },
    _id: "63ff46e20bd89343953f0e62",
    firstName: "uwase",
    lastName: "cloudine",
    role: "Nurse",
    phoneNumber: "078965546",
    license:
      "https://res.cloudinary.com/dzxupsizh/image/upload/v1677674203/vp2iycx8tu6l81cvpmux.pdf",
    specialization: ["takecare old"],
    ProfileImage:
      "https://res.cloudinary.com/dzxupsizh/image/upload/v1677674209/si5pbfzrp8jwgpaj5ch8.jpg",
    password: "$2a$10$dg6jQoOlKQheGmhEA.S8P.OOPIdBIYjMjWFvLkK53BTnwJ4iEYvje",
    email: "uwase@gmail.com",
    date: "2023-03-01T12:36:50.504Z",
    __v: 0,
  },
];
const registerPharmacy = {
  tags: ["Admin Dashboard"],
  summary: "register Pharmacy",
  description: "register Pharmacy",
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
            "location[province]": {
              type: "string",
              description: "your province",
              example: "province",
            },
            "location[district]": {
              type: "string",
              description: "your district",
              example: "district",
            },
            "location[street]": {
              type: "string",
              description: "your street",
              example: "street",
            },
            "location[address]": {
              type: "string",
              description: "Your adress",
              example: "street",
            },

            license: {
              type: "file",
              description: "your license",
              example:
                "https://res.cloudinary.com/dzxupsizh/image/upload/v1678115689/inmmztjph3dghuxksjay.pdf ",
            },
            profileImage: {
              type: "file",
              description: "your profileImage",
              example: " ",
            },

            pharmacyImage: {
              type: "file",
              description: "your pharmacy Image",
              example: " ",
            },
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
            pharmacyName: {
              type: "string",
              description: "your Pharmacy name ",
              example: "Ubwiza Pharmacy",
            },
            pharmacistName: {
              type: "string",
              description: " pharmacist name",
              example: " cloude",
            },
            phoneNumber: {
              type: "string",
              description: "phone number",
              example: "07893478",
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
            example: {
              pharmacy,
            },
          },
        },
      },
    },
  },
};
const getPharmacy = {
  tags: ["Admin Dashboard"],
  summary: "get all Pharmacy",
  description: "get all  Pharmacy",
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
            example: {
              pharmacy,
            },
          },
        },
      },
    },
  },
};
const deletePharmacyByID = {
  tags: ["Admin Dashboard"],
  summary: "delete Pharmacy By Id",
  description: "delete Pharmacy By Id",
  security: [
    {
      authorization: [],
    },
  ],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "pharmacy ",
      type: "ObjectId",
      example: "63fcfc4d4557fec17d25e83b",
    },
  ],
  responses: {
    200: {
      description: "Ok",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              pharmacy,
            },
          },
        },
      },
    },
    400: {
      description: "pharmacy  is not found",
    },
  },
};
const registerHospital = {
  tags: ["Admin Dashboard"],
  summary: "register hospital",
  description: "register hospital",
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
            "location[province]": {
              type: "string",
              description: "your province",
              example: "province",
            },
            "location[district]": {
              type: "string",
              description: "your district",
              example: "district",
            },
            "location[street]": {
              type: "string",
              description: "your street",
              example: "street",
            },
            "location[address]": {
              type: "string",
              description: "Your adress",
              example: "street",
            },

            license: {
              type: "file",
              description: "your license",
              example:
                "https://res.cloudinary.com/dzxupsizh/image/upload/v1678115689/inmmztjph3dghuxksjay.pdf ",
            },
            hospitalImage: {
              type: "file",
              description: "your hospitalImage",
              example: " ",
            },
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
            hospitalName: {
              type: "string",
              description: "your hospital name ",
              example: "Ubwiza hospital",
            },
            phoneNumber: {
              type: "string",
              description: "phone number",
              example: "07893478",
            },
            specialization: {
              type: "array",
              description: "Your specialization photo ",
              items: {
                type: "string",
              },
              minItems: 1,
              maxItems: 5,
              example: ["Dermatology", "Cardiology"],
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
            example: {
              hospital,
            },
          },
        },
      },
    },
  },
};
const getHospital = {
  tags: ["Admin Dashboard"],
  summary: "get all hospital",
  description: "get all  hospital",
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
            example: {
              hospital,
            },
          },
        },
      },
    },
  },
};
const deleteHospitalByID = {
  tags: ["Admin Dashboard"],
  summary: "delete Hospital By Id",
  description: "delete Hospital By Id",
  security: [
    {
      authorization: [],
    },
  ],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "hospital",
      type: "ObjectId",
      example: "63fcf26e96747848b6ba24e0",
    },
  ],
  responses: {
    200: {
      description: "Ok",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              pharmacy,
            },
          },
        },
      },
    },
    400: {
      description: "pharmacy  is not found",
    },
  },
};

const registerDoctor = {
  tags: ["Admin Dashboard"],
  summary: "register Doctor",
  description: "register Doctor",
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
            "location[province]": {
              type: "string",
              description: "your province",
              example: "province",
            },
            "location[district]": {
              type: "string",
              description: "your district",
              example: "district",
            },
            "location[street]": {
              type: "string",
              description: "your street",
              example: "street",
            },
            "location[address]": {
              type: "string",
              description: "Your adress",
              example: "street",
            },

            license: {
              type: "file",
              description: "your license",
              example:
                "https://res.cloudinary.com/dzxupsizh/image/upload/v1678115689/inmmztjph3dghuxksjay.pdf ",
            },
            profileImage: {
              type: "file",
              description: "your profileImage",
              example: " ",
            },

            license: {
              type: "file",
              description: "your license",
              example: " ",
            },
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
            firstName: {
              type: "string",
              description: "your first name ",
              example: "jean ",
            },
            lastName: {
              type: "string",
              description: " your last  name",
              example: " cloude",
            },
            phoneNumber: {
              type: "string",
              description: "phone number",
              example: "07893478",
            },
            specialization: {
              type: "array",
              description: "Your specialization photo ",
              items: {
                type: "string",
              },
              minItems: 1,
              maxItems: 5,
              example: ["Dermatology", "Cardiology"],
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
            example: {
              doctor,
            },
          },
        },
      },
    },
  },
};
const getDoctor = {
  tags: ["Admin Dashboard"],
  summary: "get all Doctor",
  description: "get all  Doctor",
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
            example: {
              doctor,
            },
          },
        },
      },
    },
  },
};
const deleteDoctorByID = {
  tags: ["Admin Dashboard"],
  summary: "delete Doctor By Id",
  description: "delete doctor By Id",
  security: [
    {
      authorization: [],
    },
  ],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "Doctor ",
      type: "ObjectId",
      example: "63fcfc4d4557fec17d25e83b",
    },
  ],
  responses: {
    200: {
      description: "Ok",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              pharmacy,
            },
          },
        },
      },
    },
    400: {
      description: "doctor  is not found",
    },
  },
};
const registerNurse = {
  tags: ["Admin Dashboard"],
  summary: "register Nurse",
  description: "register Nurse",
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
            "location[province]": {
              type: "string",
              description: "your province",
              example: "province",
            },
            "location[district]": {
              type: "string",
              description: "your district",
              example: "district",
            },
            "location[street]": {
              type: "string",
              description: "your street",
              example: "street",
            },
            "location[address]": {
              type: "string",
              description: "Your adress",
              example: "street",
            },

            license: {
              type: "file",
              description: "your license",
              example:
                "https://res.cloudinary.com/dzxupsizh/image/upload/v1678115689/inmmztjph3dghuxksjay.pdf ",
            },
            profileImage: {
              type: "file",
              description: "your profileImage",
              example: " ",
            },

            license: {
              type: "file",
              description: "your license",
              example: " ",
            },
            email: {
              type: "string",
              description: "your email ",
              example: " mary@gmail.com",
            },
            password: {
              type: "string",
              description: "your password ",
              example: "*****",
            },
            firstName: {
              type: "string",
              description: "your first name ",
              example: "jean ",
            },
            lastName: {
              type: "string",
              description: " your last  name",
              example: " cloude",
            },
            phoneNumber: {
              type: "string",
              description: "phone number",
              example: "07893478",
            },
            specialization: {
              type: "array",
              description: "Your specialization  ",
              items: {
                type: "string",
              },
              minItems: 1,
              maxItems: 5,
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
            example: {
              nurse,
            },
          },
        },
      },
    },
  },
};
const getNurse = {
  tags: ["Admin Dashboard"],
  summary: "get all Doctor",
  description: "get all  Doctor",
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
            example: {
              nurse,
            },
          },
        },
      },
    },
  },
};
const deleteNurseByID = {
  tags: ["Admin Dashboard"],
  summary: "delete Nurse By Id",
  description: "delete Nurse By Id",
  security: [
    {
      authorization: [],
    },
  ],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "Nurse ",
      type: "ObjectId",
      example: "63fcfc4d4557fec17d25e83b",
    },
  ],
  responses: {
    200: {
      description: "Ok",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              pharmacy,
            },
          },
        },
      },
    },
    400: {
      description: "nurse  is not found",
    },
  },
};

const createAdmin = {
  tags: ["Admin Dashboard"],
  summary: "register Admin",
  description: "register Admim",
  requestBody: {
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            ProfileImage: {
              type: "file",
              description: "your profileImage",
              example: " ",
            },

            firstName: {
              type: "string",
              description: "your first name",
            },
            lastName: {
              type: "string",
              description: "your last name ",
            },
            password: {
              type: "string",
              description: "your password ",
              example: "*****",
            },
            email: {
              type: "string",
              description: " your email",
            },
            phoneNumber: {
              type: "string",
              description: "phone number",
              example: "07893478",
            },
            role: {
              type: "string",
              description: "role",
              example: " ",
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
            example: {
              pharmacy,
            },
          },
        },
      },
    },
  },
};
const Adminlogin = {
  tags: ["Admin Dashboard"],
  summary: "login Admin",
  description: "login Admim",
  requestBody: {
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            password: {
              type: "string",
              description: "your password ",
              example: "*****",
            },
            email: {
              type: "string",
              description: " your email",
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
  },
};
const approveHospital = {
  tags: ["Admin Dashboard"],
  summary: " approve  hospital ",
  description: "approve  hospital",
  security: [
    {
      authorization: [],
    },
  ],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "hospital id ",
      type: "ObjectId",
      example: "",
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            status: {
              type: "string",
              description: "status",
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
const approvePharmacy = {
  tags: ["Admin Dashboard"],
  summary: " approve  pharmacy ",
  description: "approve  pharmacy",
  security: [
    {
      authorization: [],
    },
  ],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "pharmacy id ",
      type: "ObjectId",
      example: "",
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            status: {
              type: "string",
              description: "status",
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

const approvedDoctor = {
  tags: ["Admin Dashboard"],
  summary: " approve  doctor ",
  description: "approve  doctor",
  security: [
    {
      authorization: [],
    },
  ],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "doctor id ",
      type: "ObjectId",
      example: "",
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            status: {
              type: "string",
              description: "status",
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
const approvedNurse={
  tags: ["Admin Dashboard"],
  summary: " approve  nurse ",
  description: "approve  nurse",
  security: [
    {
      authorization: [],
    },
  ],
  parameters: [
    {
      name: "id",
      in: "path",
      description: "nurse id ",
      type: "ObjectId",
      example: "",
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            status: {
              type: "string",
              description: "status",
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
}
const AdminDashboard = {
  "/api/admin/dashboard/pharmacy": {
    get: getPharmacy,
    post: registerPharmacy,
  },
  "/api/admin/dashboard/pharmacy/{id}": {
    delete: deletePharmacyByID,
  },
  "/api/admin/dashboard/hospital": {
    get: getHospital,
    post: registerHospital,
  },
  "/api/admin/dashboard/hospital/{id}": {
    delete: deleteHospitalByID,
  },
  "/api/admin/dashboard/doctor": {
    get: getDoctor,
    post: registerDoctor,
  },
  "/api/admin/dashboard/doctor/{id}": {
    delete: deleteDoctorByID,
  },
  "/api/admin/dashboard/nurse": {
    get: getNurse,
    post: registerNurse,
  },
  "/api/admin/dashboard/nurse/{id}": {
    delete: deleteNurseByID,
  },
  "/api/admin/createAccount": {
    post: createAdmin,
  },
  "/api/admin/login": {
    post: Adminlogin,
  },
  "/api/approved/hospital/{id}":{
    post:approveHospital
  },
  "/api/approved/pharmacy/{id}":{
    post:approvePharmacy
  },
  "/api/approved/doctor/{id}":{
    post:approvedDoctor
  },
  "/api/approved/nurse/{id}":{
    post:approvedNurse
  }
};

export default AdminDashboard;
