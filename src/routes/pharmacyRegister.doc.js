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

  const registerPharmacy = {
    tags: ["Register Pharmacy"],
    summary: "register Pharmacy",
    description: "register Pharmacy",
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

  const RegisterPharmacys={
    "/api/register/pharmacy/": {
        post: registerPharmacy,
      },
  }

  export  default RegisterPharmacys

