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

  const registerHospital = {
    tags: ["Register Hostipal"],
    summary: "register hospital",
    description: "register hospital",
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


  const RegisterHospitals={
    "/api/register/hospital/": {
        post: registerHospital,
      },
  }

  export default RegisterHospitals;