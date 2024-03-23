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

  const registerNurse = {
    tags: ["Register Nurse"],
    summary: "register Nurse",
    description: "register Nurse",
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


  const RegisterNurses={
    "/api/register/nurse/": {
        post: registerNurse,
      },
  }

  export default RegisterNurses;