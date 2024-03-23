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

  const registerDoctor = {
    tags: ["Register Doctor"],
    summary: "register Doctor",
    description: "register Doctor",
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

  const RegisterDoctors={
    "/api/register/doctor/": {
        post: registerDoctor,
      },
  }

  export default RegisterDoctors