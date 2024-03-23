


const BookinDoctor={
    tags:["Booking"],
    summary:' Booking doctor  ',
    description:'Booking doctor',
    security:[
        {
            authorization:[]
        }
    ],
    parameters:[
        { 
            name:'id',
            in:'path',
            description:'doctor  id ',
            type:'ObjectId',
            example:"63d926a5f4bd9dc5a83758d1"
            
        }
    ],
    requestBody:{
        content:{
            "multipart/form-data":{
                schema:{
                    type:'object',
                    properties:{
                        phoneNumber:{
                            type:'string',
                            description:"your phone number ",
                            example:"078675236."
                        },
                        message:{
                            type:'string',
                            description:"your message ",
                            example:"fka643gs62"
                        },
                        email:{
                            type:'string',
                            description:"quantity",
                            example:"email@gmail.com"
                        },
                    }
                }
            }
        }
    },

    responses:{
        200:{
            description:'Ok',
            content:{
                "application/json":{
                    schema:{
                        type:'object',
                        example:{
                            
                        }
                    }
                }
            }
        },
        400:{
            description:'bad request ' 
        }
    }
}
const BookingNurse={
    tags:["Booking"],
    summary:' Booking nurse  ',
    description:'Booking nurse',
    security:[
        {
            authorization:[]
        }
    ],
    parameters:[
        { 
            name:'id',
            in:'path',
            description:'nurse  id ',
            type:'ObjectId',
            example:"63d926a5f4bd9dc5a83758d1"
            
        }
    ],
    requestBody:{
        content:{
            "multipart/form-data":{
                schema:{
                    type:'object',
                    properties:{
                        phoneNumber:{
                            type:'string',
                            description:"your phone number ",
                            example:"078675236."
                        },
                        message:{
                            type:'string',
                            description:"your message ",
                            example:"fka643gs62"
                        },
                        email:{
                            type:'string',
                            description:"quantity",
                            example:"email@gmail.com"
                        },
                    }
                }
            }
        }
    },

    responses:{
        200:{
            description:'Ok',
            content:{
                "application/json":{
                    schema:{
                        type:'object',
                        example:{
                            
                        }
                    }
                }
            }
        },
        400:{
            description:'bad request ' 
        }
    }
}
const booking={
    '/api/booking/doctor/{doctorId}':{
        post:BookinDoctor,
    },    
    '/api/booking/nurse/{nurseId}':{
        post:BookingNurse,
    },    
  }

  export default booking